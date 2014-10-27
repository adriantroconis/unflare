<?php

// debug
define('DEBUG', false); 

// url
define('DOMAIN', 'www.unflare.com'); 
define('PUBLIC_URL', '/');
define('PUBLIC_FULL_URL', 'http://'.DOMAIN.PUBLIC_URL);
define('ASSETS_URL', 'http://assets.'.DOMAIN.'/assets');

// database
define('PG_HOST', 'localhost');
define('PG_USER', 'app');
define('PG_PASSWORD', null);
define('PG_APP_DBNAME', 'unflr');

// memcached
define('MEMCACHED_HOST', 'localhost');
define('MEMCACHED_PORT', 11211);
define('MEMCACHED_WEIGHT', 100);

// google
define('GOOGLE_ANALYTICS', null);

// emailing: mandrill
define('SMTP_HOST', null);
define('SMTP_PORT', null);
define('MANDRILL_ACCOUNT', null);

// queue
define('QUEUE_CONNECTION', 'sync');
define('QUEUE_URL', null);