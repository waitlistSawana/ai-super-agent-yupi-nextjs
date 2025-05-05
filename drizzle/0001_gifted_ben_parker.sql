CREATE TABLE "ai-super-agent-yupi-nextjs_chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text DEFAULT 'Untitiled Chat' NOT NULL,
	"visibility" varchar DEFAULT 'private' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "ai-super-agent-yupi-nextjs_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"parts" json NOT NULL,
	"attachments" json NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai-super-agent-yupi-nextjs_message" ADD CONSTRAINT "message_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."ai-super-agent-yupi-nextjs_chat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chat_created_at_idx" ON "ai-super-agent-yupi-nextjs_chat" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "message_created_at_idx" ON "ai-super-agent-yupi-nextjs_message" USING btree ("createdAt");