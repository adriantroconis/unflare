<?php

return [

	// PDO Fetch Style
	'fetch' => PDO::FETCH_CLASS,

	// Default Database Connection Name
	'default' => 'main',

	// Database Connections
	'connections' => [

		'main' => [
			'driver'   => DB_TYPE,
			'host'     => DB_HOST,
			'database' => DB_APP_DBNAME,
			'username' => DB_USER,
			'password' => DB_PASSWORD,
			'charset'  => 'utf8',
			'prefix'   => '',
			'schema'   => 'public',
			'collation' => (DB_TYPE === 'mysql') ? 'utf8_unicode_ci' : null,
		],
		
	],

];
