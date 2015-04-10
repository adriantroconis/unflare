<?php

// debug
define('DEBUG', true); // set to `false` for production environment
define('DOMAIN', 'www.yourwebsite.com'); // change to your URL domain

// database
define('DB_TYPE', 'mysql');  // mysql or pgsql
define('DB_HOST', 'localhost'); // most common value
define('DB_USER', 'root'); // change this
define('DB_PASSWORD', ''); // change this
define('DB_APP_DBNAME', ''); // change this

// google
define('GOOGLE_ANALYTICS', ''); // optional

// emailing
define('SMTP_HOST', null); // if null: mandrill else: no email issent
define('SMTP_USER', null);
define('SMTP_PASSWORD', null);
define('SMTP_PORT', null);

// mandrill
define('MANDRILL_ACCOUNT', ''); // subaccount 
define('MANDRILL_GA', ''); // Google Analytics account used for Mandrill
define('MANDRILL_KEY', ''); // API Key

// expert area
// ----------------------------------------------------
define('SHARED_HOSTING', true); // don't touch unless you'd like to work on source assets files

// queue: don't touch unless you need to setup a queue server. a database driver is provided.
// if you setup a queue driver, run the queue listener, more infos on : 
// http://laravel.com/docs/4.2/queues#running-the-queue-listener
define('QUEUE_CONNECTION', 'sync'); 
define('QUEUE_URL', null); // same as above

// don't touch
define('PUBLIC_FULL_URL', 'http://'.DOMAIN); 
define('ASSETS_URL', 'http://'.DOMAIN.'/assets');