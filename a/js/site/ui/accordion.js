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
	});
	new jss.Style(".accordion > div > *:first-child::after", {
		content: "''",
		display: "inline-block",
		width: "0",
		height: "0",
		margin: "0.2em",
		verticalAlign: "middle",
		borderTop: "0.2em solid "+theme.accent,
		borderLeft: "0.2em solid hsla(0,0%,0%,0)",
		borderRight: "0.2em solid hsla(0,0%,0%,0)",
	});
	new jss.Style(".accordion > div > *:first-child:hover", {
		background: "hsla(0,0%,0%,0.1)",
	});
	new jss.Style(".accordion > div:not(.active) > *:not(:first-child)", {
		display: "none",
	});
	
	$(document).delegate(".accordion > div > *:first-child", "click", function(e){
		var $ele = $(e.currentTarget.parentNode);
		var $all = $(e.currentTarget.parentNode.parentNode.children);
		
		if ($ele.hasClass("active")) { // If already open close.
			$ele.removeClass("active");
		} else { // Otherwise open and close others.
			$all.removeClass("active");
			$ele.addClass("active");
		}
	});
});
