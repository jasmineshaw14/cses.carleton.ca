define([
	"jquery",
	"scriptup",
	"moment",
	"cses",
	"jss",
	"site/theme",
	"site/assets",
], function(
	$,
	scriptup,
	moment,
	cses,
	jss,
	theme,
	assets
) {
	"use strict";
	
	var style = new jss.StyleSet(
		new jss.Style({
			fontSize: "0.8em",
			maxWidth: "100%",
		}),
		new jss.Style("& ol", {
			padding: "0",
			listStyle: "none",
		}),
		new jss.Style("& ol>li", {
			display: "inline-block",
			width: "50%",
			verticalAlign: "middle",
		}),
		new jss.Style("& ol>li>a", {
			display: "block",
			margin: "0.2em",
			padding: "1em",
			textDecoration: "none",
			color: "inherit",
			transition: "background 0.3s",
		}),
		theme.hoverMixin("& ol>li>a:hover"),
		new jss.Style("& h2", {
			fontSize: "1.1em",
			margin: "0 0 1em 0",
			overflow: "hidden",
			textOverflow: "ellipsis",
		})
	);
	
	function uiPostTile(p){
		return scriptup("a", {href: p.id}, function(su){
			p.load();
			var date = su("div", {
				css: {
					color: theme.textDeemphColor,
				},
			});
			p.createdchanged.add(function(d){
				date.text(moment(d).format("MMMM Do, YYYY"));
			});
			var title = su("h2");
			p.titlechanged.add(function(t){
				title.text(t);
			})
		});
	}
	
	function News(articles)
	{
		this.$root = scriptup("div", {
			class: style.classes,
		}, function(su){
			su("h1", "What's Happening Right Now?", function(su){
				this.prepend($("<img>", {
					src: assets.icons.news,
					css: {
						verticalAlign: "baseline",
						width: "1.6em",
						margin: "0 0.4em -0.4em 0",
					},
				}));
			});
			cses.Post.find({limit: 8}).then(function(posts){
				su("ol", function(su){
					posts.forEach(function(p){
						su("li").append(uiPostTile(p));
					});
				});
			});
		});
	}
	Object.preventExtensions(News);
	Object.defineProperties(News.prototype, {
	});
	Object.preventExtensions(News.prototype);
	
	return News;
});
