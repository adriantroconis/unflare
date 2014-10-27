<?php

// debug
define('DEBUG', true); 

// url
define('DOMAIN', 'dev.unflare.com'); 
define('PUBLIC_URL', '/');
define('PUBLIC_FULL_URL', 'http://'.DOMAIN.PUBLIC_URL);
define('ASSETS_URL', 'http://'.DOMAIN.'/assets');

// database
define('PG_HOST', 'localhost');
define('PG_USER', 'admin');
define('PG_PASSWORD', null);
define('PG_APP_DBNAME', 'unflr');

// memcached
define('MEMCACHED_HOST', 'localhost');
define('MEMCACHED_PORT', 11211);
define('MEMCACHED_WEIGHT', 100);

// emailing: mailcatcher
define('SMTP_HOST', 'localhost');
define('SMTP_PORT', 1025);
define('MANDRILL_ACCOUNT', null);

// google
define('GOOGLE_ANALYTICS' , null);

// queue
define('QUEUE_CONNECTION', 'sync');
define('QUEUE_URL', null);
