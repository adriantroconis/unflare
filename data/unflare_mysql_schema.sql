-- Unflare MySQL App Schema
-- ==========================================================

CREATE TABLE users (
	`id` bigint AUTO_INCREMENT,
	`email` VARCHAR(255)  not null,
	`ipaddress` TEXT  not null,
	-- anti-spam
	`email_was_opened` bool not null default false,
	`email_has_bounced` bool not null default false, 
	`email_is_on_facebook` bool, 
	-- preferences
	`receives_notifs` bool not null default true,
	`unsubscribe_guid` VARCHAR(255)  not null,
	-- referral
	`referral_code` VARCHAR(255)  not null,
	`referral_count` int(11) not null default 0,
	`referred_by` VARCHAR(255) , 
	-- other infos
	`has_mobile_registered` bool,
	`coupon` VARCHAR(255)  not null,
	-- timestamps
	`created_at` DATETIME,
	`updated_at` DATETIME,
	primary key (`id`),
	unique (`email`),
	unique (`referral_code`)
) ;

CREATE TABLE queues (
	`id` bigint AUTO_INCREMENT, 
	`queue` TEXT ,
	`status` int(11) default 0,
	`retries` int(11) default 0,
	`timestamp` DATETIME,
	`payload` TEXT ,
	-- timestamps
	`created_at` DATETIME,
	`updated_at` DATETIME,
	primary key (`id`)
) ;

CREATE TABLE failed_jobs (
	`id` bigint AUTO_INCREMENT, 
	`connection` TEXT ,
	`queue` TEXT ,
	`payload` TEXT ,
	`failed_at` DATETIME,
	primary key (`id`)
) ;

