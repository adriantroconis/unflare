<?php

return [

	// Supported: "sync", "beanstalkd", "sqs", "iron", "database"
	'default' => QUEUE_CONNECTION,
		
	'connections' => [

		'sync' => [
			'driver' => 'sync',
		],

		'database' => [
			'driver' => 'database',
			'queue'  =>  null, // optional, can be null or any string
		],
	],

	'failed' => [
		'database' => 'main', 
		'table'    => 'failed_jobs',
	],
];
