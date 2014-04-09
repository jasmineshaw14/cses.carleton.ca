<?php

$components = preg_split('/[\\/\\?]/', $_SERVER['REQUEST_URI'], 3);

function simple($title, $text) {
	$url = explode('?', $_SERVER['REQUEST_URI'])[0];
	include('header.php');
	echo "</head><body>\n";
	echo "<h1>".htmlspecialchars($title)."</h1>\n";
	echo "<p>".$text."</p>\n";
	echo "</body></head>\n";
}

switch ($components[1]) {
case "":
	simple("CSES", "Welcome to the CSES website, there is nothing here yet.");
	break;
default:
	$script = __dir__.$components[1].'/index.php';
	if (file_exists($script)) {
		include($script);
	} elseif (file_exists($_SERVER['DOCUMENT_ROOT'].'a/js/page/'.$components[1].'.js')) {
		simple('Not Available — CSES', "Sorry Javascript is required to view this page.");
	} else {
		simple('404 Not Fount — CSES', "This page does not exist.");
	}
}
