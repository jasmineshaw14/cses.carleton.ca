define(["jquery"], function($){
	var self = Object.create(Object.prototype, {
		article: {
			value: function template_article($cont, page){
				document.title = page.title + " — CSES";
				$cont.append(page.content.children());
			},
		},
	});
	Object.preventExtensions(self);
	return self;
});
