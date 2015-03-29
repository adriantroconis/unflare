<?php

// debug
define('DEBUG', false); 

// url
define('DOMAIN', 'www.unflare.com'); 
define('PUBLIC_FULL_URL', 'http://'.DOMAIN);
define('ASSETS_URL', 'http://'.DOMAIN.'/assets');

// database
define('PG_HOST', 'localhost');
define('PG_USER', 'app');
define('PG_PASSWORD', null);
define('PG_APP_DBNAME', 'unflr');

// google
define('GOOGLE_ANALYTICS', null);

// emailing
define('SMTP_HOST', null); // if null: mandrill else: laravel mail pretend
define('MANDRILL_ACCOUNT', null); // subaccount 
define('MANDRILL_GA', null); // Google Analytics account used for Mandrill
define('MANDRILL_KEY', null); // API Key

// queue
define('QUEUE_CONNECTION', 'sync'); // recommended in prod: database driver with supervisord
define('QUEUE_URL', null);