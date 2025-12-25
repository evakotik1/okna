ALTER TABLE "calculation" ADD COLUMN "status" varchar(50) DEFAULT 'new';--> statement-breakpoint
ALTER TABLE "measurement" ADD COLUMN "status" varchar(50) DEFAULT 'new';--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "status" varchar(50) DEFAULT 'new';--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "status" varchar(50) DEFAULT 'new';