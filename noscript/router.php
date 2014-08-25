<?php

$buildid = ''; # Will be filled by build script.

$path = substr($_SERVER['REQUEST_URI'], 0, -1 -strlen($_SERVER['QUERY_STRING']));
$components = preg_split('/[\\/\\?]/', $path, 3);

function simple($title, $text) {
	global $path;
	$url = $path;
	include('header.php');
	echo "</head><body>\n";
	echo "<h1>".htmlspecialchars($title)."</h1>\n";
	echo "<p>".$text."</p>\n";
	echo "</body></head>\n";
}

function apiURL() {
	$h = $_SERVER['HTTP_HOST'];
	if ($_SERVER['SERVER_NAME'] == 'cses.carleton.ca')
		return 'https://api.cses.carleton.ca';
	elseif ($_SERVER['SERVER_NAME'] == 'cses.kevincox.ca')
		return 'https://cses.kevincox.ca';
	else
		return "$_SERVER[REQUEST_SCHEME]://$_SERVER[SERVER_NAME]:8080";
}

switch ($components[1]) {
case "":
	simple("CSES", "Welcome to the CSES website, there is nothing here yet.");
	break;
default:
	$script = __dir__.$components[1].'/index.php';
	if (file_exists($script)) {
		include($script);
	} elseif (file_exists("$_SERVER[DOCUMENT_ROOT]/a/$buildid/js/site/page/$components[1].js")) {
		simple('Not Available — CSES', "Sorry Javascript is required to view this page.");
	} else {
		$c = curl_init(apiURL()."/post$path");
		curl_setopt($c, CURLOPT_RETURNTRANSFER, TRUE);
		$r = curl_exec($c);
		
		if ($e = curl_error($c)) {
			simple('502 API Not Available — CSES', $e);
			return;
		}
		
		$j = json_decode($r);
		if (!$j->e) {
			$url = $path;
			$title = $j->title;
			include('header.php');
			echo "</head><body>\n";
			echo $j->content;
			echo "</body></head>\n";
		} else {
			simple('404 Not Found — CSES', "This page does not exist.");
		}
	}
}
