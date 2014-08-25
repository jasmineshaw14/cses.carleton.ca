<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title><?=htmlspecialchars($title)?></title>
<meta name="viewport" content="width=device-width, user-scalable=yes"/>
<link rel="canonical" href="<?=htmlspecialchars($url)?>">
<script>location=<?=
	/***** SECURITY INFO
	 * Be careful before changing the settings here.
	 * 
	 * In HTML <script> tags are treaded as XML CDATA sections.  This means that
	 * there is no need, or ability to use HMTL entites to escape special
	 * characters.  However the script tag ends at the first occurance of '</'.
	 * In a well formed document this would be the start of '</script>'.
	 * 
	 * Since '</' is valid in a JSON string we need to ensure that
	 * they don't appear in the output, as that would allow an attacker to
	 * instert arbratary content into our page.
	 *
	 * Since all URL's contain a '/' I don't want to have to escape it, so I set
	 * JSON_UNESCAPED_SLASHES.  However this leaves both '<' and '/' unescaped
	 * so I enabled JSON_HEX_TAG, so that the '<' will be escaped.  This
	 * character probably shouldn't be in most URLs so it won't make the page
	 * ugly but is important for security.
	 */
	json_encode($url, JSON_HEX_TAG|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE)
?></script>
