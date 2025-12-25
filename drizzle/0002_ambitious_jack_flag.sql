CREATE TYPE "public"."status_enum" AS ENUM('PROCESSING', 'COMPLETED');--> statement-breakpoint
ALTER TABLE "measurement" ALTER COLUMN "status" SET DEFAULT 'PROCESSING'::"public"."status_enum";--> statement-breakpoint
ALTER TABLE "measurement" ALTER COLUMN "status" SET DATA TYPE "public"."status_enum" USING "status"::"public"."status_enum";