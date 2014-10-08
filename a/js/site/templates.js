define([
	"jquery",
	"scriptup",
	"cses",
	"site/theme",
], function(
	$,
	scriptup,
	cses,
	theme
){
	var self = Object.create(Object.prototype, {
		page: {
			value: function template_article(page){
				document.title = page.title + " — CSES";
				return $("<div>", {class: theme.content.classes}).html(page.content);
			},
		},
	});
	Object.preventExtensions(self);
	return self;
});
