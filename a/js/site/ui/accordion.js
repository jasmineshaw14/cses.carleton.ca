define([
	"jquery",
	"jss",
	"site/theme",
], function(
	$,
	jss,
	theme
) {
	new jss.Style(".accordion", {});
	new jss.Style(".accordion > div", {});
	new jss.Style(".accordion > div > *:first-child", {
		display: "block",
		width: "auto",
		margin: 0,
		color: "white",
		background: theme.accent,
	});
	new jss.Style(".accordion > div > *:first-child", {
		display: "block",
		width: "auto",
		margin: 0,
		color: "white",
		background: theme.accent,
	});
	new jss.Style(".accordion > div > *:first-child:hover", {
		background: theme.accentHover,
	});
	new jss.Style(".accordion > div:not(.active) > *:not(:first-child)", {
		display: "none",
	});
	
	$(document).delegate(".accordion > div", "click", function(e){
		var ele = e.currentTarget;
		var acc = ele.parentNode;
		
		$(acc.children).removeClass("active");
		$(ele).addClass("active");
	});
});
