# Unflare - Untorch clone

Untorch referral tool open-source clone based on Laravel (PHP) & Bootstrap3.

## Requirements

- PostgreSQL
- Memcached
- Node.js (grunt)
- Mandrill account
- Mailcatcher (dev env)

## Setup

- Specifiy an environment variable in your .htaccess or nginx configuration file:
```shell
DocumentRoot "/www/unflr/public/"
SetEnv ENVIRONMENT development
```

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

## Other

- logo by logoinstant: http://www.logoinstant.com/modern-flow-logo/
