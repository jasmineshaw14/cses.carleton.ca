define(["jquery", "scriptup", "cses"], function($, scriptup, cses){
	var self = Object.create(Object.prototype, {
		page: {
			value: function template_article(page){
				document.title = page.title + " — CSES";
				return $("<div>").html(page.content);
			},
		},
		dir: {
			value: function template_dir(page){
				return scriptup(self.page(page), function(su){
					su("h2", "Sub-articles");
					su("ul", function(su){
						cses.Post.find({
							dir: page.id,
						}).then(function(pages){
							for (var i = 0; i < pages.length; i++) {
								var p = pages[i];
								
								su("li", function(su){
									su("a", {
										href: "/"+p.id,
										text: p.title,
									});
								});
							}
						});
					});
				});
			}
		}
	});
	Object.preventExtensions(self);
	return self;
});
