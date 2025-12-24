import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import mime from "mime-types";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";
import { files } from "../../db/schema";
import { db } from "../../db";
import { userServise } from "./user";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function UploadFile({
  file,
  isImage = true,
}: {
  file: File;
  isImage?: boolean;
}) {

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large");
  }

  const arrayBuffer = await file.arrayBuffer();
  let buf = Buffer.from(arrayBuffer);


  if (isImage) {
    buf = await sharp(buf).webp().toBuffer();
  }


  const placeholder = isImage ? (await getPlaiceholder(buf)).base64 : undefined;

  const mimeType = mime.extension(file.name);
  const resolvedMimeType = mimeType ? mimeType : "application/octet-stream";

  let id: string | undefined;
  
  await db.transaction(async (tx) => {
    const [f] = await tx
      .insert(files)
      .values({
        id: crypto.randomUUID(),
        fileName: file.name,
        fileSize: file.size,
        contentType: resolvedMimeType,
        placeholder,
      })
      .returning();

    id = f!.id;

    const s3File = (await import("bun")).s3.file(id);
    await s3File.write(buf, {
      type: resolvedMimeType,
    });
  });

  return id!;
}

export const fileRouter = new Elysia({ 
  prefix: "/file" 
})
  .use(userServise)
  
  .get(
    "/:id",
    async ({ params, set }) => {
      const file = await db.query.files.findFirst({
        where: eq(files.id, params.id),
      });

      if (!file) {
        set.status = 404;
        return { error: "File not found" };
      }

      const { s3 } = await import("bun");
      const s3File = s3.file(file.id);

      set.headers["Content-Type"] = file.contentType;
      set.headers["Content-Disposition"] = `inline; filename="${encodeURIComponent(file.fileName)}"`;

      return s3File.stream();
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  
  .post(
    "/",
    async ({ body }) => {
      const id = await UploadFile({
        file: body.file,
        isImage: true,
      });
      
      return { 
        id,
        success: true,
        message: "File uploaded successfully"
      };
    },
    {
      body: t.Object({
        file: t.File(),
      }),
      whichRole: "admin",
    },
  )
  
  .post(
    "/generic",
    async ({ body }) => {
      const id = await UploadFile({
        file: body.file,
        isImage: false,
      });
      
      return { 
        id,
        success: true
      };
    },
    {
      body: t.Object({
        file: t.File(),
      }),
      whichRole: "admin",
    },
  );

export async function GetFileMetadata(id: string) {
  const metadata = await db.query.files.findFirst({
    where: eq(files.id, id),
  });

  if (!metadata) {
    throw new Error("File not found");
  }

  return metadata;
}