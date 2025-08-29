ALTER TABLE "todo" RENAME TO "order";--> statement-breakpoint
ALTER TABLE "order" RENAME COLUMN "text" TO "blades";--> statement-breakpoint
ALTER TABLE "order" RENAME COLUMN "done" TO "paid";