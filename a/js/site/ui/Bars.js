define([
	"jquery",
	"jss",
	"scriptup",
	"site/assets",
], function(
	$,
	jss,
	scriptup,
	assets
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
		new jss.Style("&>div", {
			display: "table-row",
			background: "red",
			boxShadow: "0.2em 0.2em 0.2em hsla(0,0%,0%,0.5)",
		}),
		new jss.Style("&>div>*", {
			display: "table-cell",
			height: "100%",
			padding: "0.8em",
			fontSize: "0.8em",
			
			borderLeftWidth: "1px",
			borderLeftStyle: "solid",
			borderImage:
				"linear-gradient(to bottom,"+
					"hsla(0,0%,100%,0)10%,"+
					"hsla(0,0%,100%,1),"+
					"hsla(0,0%,100%,0)90%"+
				")1",
		}),
		new jss.Style("&>div>a", {
			paddingBottom: "2.8em",
			backgroundImage: "url("+assets.ribbionNext+")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "5em",
			backgroundPosition: "calc(100% - 1em)calc(100% - 0.8em)",
		}),
		new jss.Style("&>div>*:first-child", {
			border: "none",
		}),
		new jss.Style("&>div>a:first-child", {
			paddingBottom: "0.8em",
			backgroundPosition: "calc(100% - 1em)calc(0% + 0.8em)",
		}),
		new jss.Style("&>div>a:hover", {
			backgroundImage: "url("+assets.ribbionNextHover+")",
		}),
		new jss.Style("&>div>* h1", {
			fontSize: "1.4em",
			marginBottom: "0.6em",
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
		this.$root = scriptup("div");
	}
	Object.preventExtensions(Bar);
	Object.defineProperties(Bar.prototype, {
		/** Add an item.
		 * Content is html.
		 */
		add: {
			value: function bar_add(url, title, content) {
				this.addElement(
					scriptup("a", {href: url}, su => {
						su("h1", title);
						su("p").html(content);
					})
				);
			},
		},
		
		addElement: {
			value: function bar_addElement(e) {
				this.$root.append(e);
				return e;
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
