<?php

# Will be filled by build script.
$buildid = '';
$apiURL = 'http://localhost:8080';


$path = substr($_SERVER['REQUEST_URI'], 0, -1 -strlen($_SERVER['QUERY_STRING']));
$components = preg_split('/[\\/\\?]/', $path, 3);

function simple($title, $text, $status=200) {
	http_response_code($status);
	global $path;
	$url = $path;
	include('header.php');
	echo "</head><body>\n";
	include('header_body.php');
	echo "<h1>".htmlspecialchars($title)."</h1>\n";
	echo "<p>".$text."</p>\n";
	echo "</body></html>\n";
}

$script = __dir__.$components[1].'/index.php';
if (file_exists($script)) {
	include($script);
} elseif (file_exists("$_SERVER[DOCUMENT_ROOT]/a/$buildid/js/site/page/$components[1].js")) {
	simple('Not Available', "Sorry Javascript is required to view this page.");
} else {
	$c = curl_init($apiURL."/post$path");
	curl_setopt($c, CURLOPT_RETURNTRANSFER, TRUE);
	$r = curl_exec($c);
	
	if ($e = curl_error($c)) {
		simple('502 API Not Available', $e, 502);
		return;
	}
	
	$j = json_decode($r);
	if (!$j->e) {
		$url = $path;
		$title = $j->title;
		include('header.php');
		echo "</head><body>\n";
		include('header_body.php');
		echo $j->content;
		echo "\n</body></html>\n";
	} else {
		simple('404 Not Found', "This page does not exist.", 400);
	}
}
