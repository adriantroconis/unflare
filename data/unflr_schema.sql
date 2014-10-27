-- Unflr App Schema
-- ==========================================================

CREATE TABLE users (
	"id" bigserial,
	"email" varchar not null,
	"ipaddress" varchar not null,
	-- anti-spam
	"email_was_opened" boolean not null default false,
	"email_has_bounced" boolean not null default false, 
	"email_is_on_facebook" boolean, 
	-- preferences
	"receives_notifs" boolean not null default true,
	"unsubscribe_guid" varchar not null,
	-- referral
	"referral_code" varchar not null,
	"referral_count" integer not null default 0,
	"referred_by" varchar, 
	-- other infos
	"has_mobile_registered" boolean,
	"extra" json,
	-- timestamps
	"created_at" timestamp,
	"updated_at" timestamp,
	primary key ("id"),
	unique ("email"),
	unique ("referral_code")
);

CREATE TABLE failed_jobs (
	"id" bigserial, 
	"connection" varchar,
	"queue" varchar,
	"payload" varchar,
	"failed_at" timestamp,
	primary key ("id")
);
