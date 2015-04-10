<?php

return [

	//  Default Cache Driver
	//  Supported: "file", "database", "apc", "memcached", "redis", "array"
	'driver' => 'file',

	// File Cache Location
	'path' => storage_path().'/cache',

	//  Cache Key Prefix (avoid collisions)
	'prefix' => 'unflr',

];
