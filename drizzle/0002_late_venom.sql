DROP INDEX "name_idx";--> statement-breakpoint
CREATE INDEX "post_name_idx" ON "ai-super-agent-yupi-nextjs_post" USING btree ("name");