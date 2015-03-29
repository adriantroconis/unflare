<?php

return [

	// Supported: "sync", "beanstalkd", "sqs", "iron", "database"
	'default' => QUEUE_CONNECTION,
		
	'connections' => [

		'sync' => [
			'driver' => 'sync',
		],

	],

	'failed' => [
		'database' => 'main', 
		'table'    => 'failed_jobs',
	],
];
