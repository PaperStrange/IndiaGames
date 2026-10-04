CREATE TABLE `paper_captures` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`notebook_id` text NOT NULL,
	`content` text NOT NULL,
	`original_key` text NOT NULL,
	`prepared_key` text NOT NULL,
	`fingerprint` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_paper_owner_notebook` ON `paper_captures` (`owner`,`notebook_id`,`created_at`);