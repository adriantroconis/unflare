# Unflare - Untorch clone

Untorch referral tool open-source clone based on Laravel (PHP) & Bootstrap3.  
Screenshots: [Landing Page](https://github.com/younes0/unflare/blob/master/data/docs/unflare-step1.png), [Form submitted](https://github.com/younes0/unflare/blob/master/data/docs/unflare-step2.png)

## Requirements

- PostgreSQL
- Memcached
- Node.js (grunt)
- Mandrill account
- Mailcatcher (for testing purposes)

## Setup

- Create new database and execute table creations with `data\unflr_schema.sql`

- Specifiy an environment variable in your .htaccess or nginx configuration file:

```shell
DocumentRoot "/www/unflr/public/"
SetEnv ENVIRONMENT development
```
See [Laravel docs](http://laravel.com/docs/4.2/installation) for rewriting rules

- Edit constants defined in the following files:
	+ config\constants.development.php
	+ config\constants.production.php
	+ config\unflr.php

- Dependencies
```shell
php unflr\application\config\composer install
php unflr\application\artisan config:publish php-console/laravel-service-provider
cd unflr\assets\grunt\ && npm install && grunt
```

- Run tests
```shell
php unflr\application\config\codecept run
```

## TODO

- Improve Doc
- Decouple from Memcached & Mandrill

## Other

- logo by logoinstant: http://www.logoinstant.com/modern-flow-logo/
