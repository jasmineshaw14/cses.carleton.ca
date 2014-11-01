define([
	"jquery",
	"jss",
	"scriptup",
], function(
	$,
	jss,
	scriptup
) {
	var style = new jss.StyleSet(
		new jss.Style({
			display: "table",
			width: "auto",
			maxWidth: "50rem", // Match index page max.
			color: "white",
			margin: "0 auto",
			borderSpacing: "0 1em",
		}),
		new jss.Style("&>ul", {
			display: "table-row",
			background: "red",
			boxShadow: "0.2em 0.2em 0.2em hsla(0,0%,0%,0.5)",
		}),
		new jss.Style("&>ul>li", {
			display: "table-cell",
			verticalAlign: "top",
			borderLeftWidth: "1px",
			borderLeftStyle: "solid",
			borderImage:
				"linear-gradient(to bottom,"+
					"hsla(0,0%,100%,0)10%,"+
					"hsla(0,0%,100%,1),"+
					"hsla(0,0%,100%,0)90%"+
				")1 100%",
		}),
		new jss.Style("&>ul>li>a", {
			display: "block",
			padding: "0.8em",
		}),
		new jss.Style("&>ul>li:first-child", {
			border: "none",
		}),
		new jss.Style("&>ul>li>a h1", {
			fontSize: "1.2em",
			marginBottom: "0.6em",
		}),
		new jss.Style("&>ul>li>a p", {
			fontSize: "0.8em",
		})
	);
	
	function Bars() {
		this.$root = scriptup("div", {
			class: "chrome " + style.classes,
		});
	}
	Object.preventExtensions(Bars);
	Object.defineProperties(Bars.prototype, {
		createBar: {
			value: function bars_createBar() {
				var bar = new Bar();
				this.$root.append(bar.$root);
				return bar;
			},
		},
	});
	Object.preventExtensions(Bars.prototype);
	
	function Bar() {
		this.$root = scriptup("ul");
	}
	Object.preventExtensions(Bar);
	Object.defineProperties(Bar.prototype, {
		/** Add an item.
		 * Content is html.
		 */
		add: {
			value: function bar_add(url, title, content) {
				scriptup("li", su => {
					su("a", {href: url}, su => {
						su("h1", title);
						su("p").html(content);
					});
				}).appendTo(this.$root);
			},
		},
		
		background: {
			set: function bars_background_set(color) {
				this.$root.css("background", color);
			}
		}
	});
	Object.preventExtensions(Bar.prototype);
	
	return Bars;
});
