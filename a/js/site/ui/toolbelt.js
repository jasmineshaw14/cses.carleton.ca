define(["scriptup", "jss"],
function(scriptup, jss)
{
	"use strict";
	
	var style = new jss.StyleSet(
		new jss.Style({
			position: "fixed",
			top: "0",
			left: "0",
			zIndex: "20",
		}),
		new jss.Style("&>li", {
			fontSize: "1.3em",
			margin: "0.3em 0",
			padding: "0.4em 0",
			background: "linear-gradient(to bottom, hsl(0,0%,20%), hsl(0,0%,30%) 20%, hsl(0,0%,0%))",
			color: "white",
			borderRadius: "0 0.8em 0.8em 0",
			transform: "translateX(calc(-100% + 1.8em - 1px))",
			transition: "transform 0.5s",
		}),
		new jss.Style("&>li:hover", {
			transform: "translateX(0)",
		}),
		new jss.Style("&>li>*", {
			display: "inline-block",
			whiteSpace: "pre",
			padding: "0 0.5em",
			verticalAlign: "middle",
		}),
		new jss.Style("&>li>*:last-child", {
			fontSize: "1.2em",
			width: "1.6em",
			height: "1.2em",
			borderLeft: "1px solid hsl(0,0%,80%)",
		})
	);
	
	var belt = scriptup("ul", {
		class: "chrome " + style,
	}).appendTo(document.body);
	
	function Tool(letter, action)
	{
		var self = this;
		
		this.$root = scriptup("li", function(su){
			su("span", action);
			su("span", letter);
		}).appendTo(belt);
	}
	Object.preventExtensions(Tool);
	Object.defineProperties(Tool.prototype, {
	});
	Object.preventExtensions(Tool.prototype);
	
	return {
		Tool: Tool,
	};
});
