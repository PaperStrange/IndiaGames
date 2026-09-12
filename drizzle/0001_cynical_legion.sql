CREATE TABLE `companion_memories` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`notebook_id` text NOT NULL,
	`content` text NOT NULL,
	`status` text NOT NULL,
	`fingerprint` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_memory_identity` ON `companion_memories` (`owner`,`fingerprint`);--> statement-breakpoint
CREATE INDEX `idx_memory_scope` ON `companion_memories` (`owner`,`notebook_id`,`status`);--> statement-breakpoint
CREATE TABLE `companion_proposals` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`content` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `companion_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`notebook_id` text NOT NULL,
	`content` text NOT NULL,
	`cost` real DEFAULT 0 NOT NULL,
	`reserved` real DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_runs_owner` ON `companion_runs` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `companion_settings` (
	`owner` text PRIMARY KEY NOT NULL,
	`config` text NOT NULL,
	`secrets` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `memory_events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`memory_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_memory_events` ON `memory_events` (`owner`,`memory_id`,`created_at`);