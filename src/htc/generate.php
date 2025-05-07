<?php

$versions = ['6.0','5.0','4.0','3.0','2.7','2.5','2.0','1.5'];
$path = '/Users/shawn/tmp/wordpress_';

function sp_process_line_to_array($array, $matches, $type) {
	list($orig, $file, $line, $assignment, $name, $args) = $matches;
	$name = str_replace(array(' ', '.', '$'), '', $name);

	$args = implode(', ', array_map('trim', array_filter(explode(', ', $args))));

	if(!isset($array[$name])) {
		$array[$name] = [
			'type' => $type,
			'count' => 0,
			'files' => array(),
			'args' => addslashes(htmlentities($args)),
			'term' => $name
		];
	}
	$array[$name]['files'][$file][] = $line;
	$array[$name]['count']++;	
	
	return $array;
}

function sp_get_percent_position($low, $high, $percent, $round = 2) {
	return round(($percent * ($high-$low)) + $low, $round);
}

function sp_sort_by_key($data, $sort_key) {
	if (is_object(current($data))) {
		$callback = function($a, $b) use ($sort_key) {
			return strnatcasecmp($a->{$sort_key}, $b->{$sort_key});
		};
	} else {
		$callback = function($a, $b) use ($sort_key) {
			return strnatcasecmp($a[$sort_key], $b[$sort_key]);
		};
	}

	uasort($data, $callback);
	return $data;
}

function run($version) {
	global $path;

	if (!is_dir($path . $version)) {
		// echo 'bad version ' . $version . PHP_EOL;
		// return;
		$a = `mkdir -p {$path}{$version}`;
		echo $a;
		$b = `git clone -b {$version}-branch --single-branch https://github.com/WordPress/WordPress.git {$path}{$version}`;
		echo $b;
	}

	// FILTERS
	$findCmd = 'find '.$path.$version.' -type f ! \( -path "*svn*" -o -path "*theme*" -o -path "*git*" -o -path "*plugins*" -o -path "*wp-plugins*" \)';

	$command = $findCmd . ' | xargs grep -En "apply_filters\((.*?)\);"';
	exec($command, $ret);

	$filters = array();
	foreach($ret as $line) {
		if(preg_match('#^.*wordpress_[0-9\.]+(.*):([0-9]+):(.*?)apply_filters\(\s?[\'|"](.*?)[\'|"](.*?)?\);#', $line, $matches)) {
			$filters = sp_process_line_to_array($filters, $matches, 'filter');
		}
	}

	// ACTIONS
	$command = $findCmd . ' | xargs grep -En "do_action\((.*?)\);"';
	exec($command, $ret);	

	$actions = array();
	foreach($ret as $line) {
		if(preg_match('#^.*wordpress_[0-9\.]+(.*):([0-9]+):(.*?)do_action\(\s?[\'|"](.*?)[\'|"](.*?)?\);#', $line, $matches)) {
			$actions = sp_process_line_to_array($actions,$matches,'action');
		}
	}
		
	// MERGE ARRAYS	
	$list = array_merge(array_values($filters), array_values($actions));
	$list = sp_sort_by_key($list, 'term');

	// do a little special handling for count so a massively used hook doesn't dominiate so badly
	$max = array();
	foreach($list as $key => $item) {
		$max[$key] = $item['count'];
	}
	rsort($max);
	if(($max[0]-$max[1]) > 10) {
		$max[0] = $max[1] + 10;
	}
	$max = $max[0];

	$size_low = 14;
	$size_high = 40;
	$opacity_low = 50;
	$opacity_high = 100;

	$processed = array_map(function($item) use (
		$max, 
		$size_low, 
		$size_high, 
		$opacity_high, 
		$opacity_low
	) {
		if ($item['count'] > $max) {
			$item['count'] = $max;
		}

		$percent = ($item['count'] === 1 ? .1 : $item['count']) / $max;
		$item['font-size'] = round(($percent * ($size_high - $size_low)) + $size_low, 2) . 'px';
		$item['opacity'] = round(($percent * ($opacity_high - $opacity_low))+$opacity_low, 2) / 100;

		return $item;
	}, $list);

	$data = [
		'version' => $version,
		'counts' => [
			'filters' => count($filters),
			'actions' => count($actions),
		],
		'data' => array_values($processed),
	];

	file_put_contents('./json/wordpress-'.$version.'.json', json_encode($data));
}

foreach ($versions as $version) {
	echo('Generating: ' . $version . PHP_EOL);
	run($version);
}
echo('Done' . PHP_EOL);
