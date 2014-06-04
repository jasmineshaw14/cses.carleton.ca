define(["jquery", "cses"], function($, cses){
	var self = Object.create(Object.prototype, {
		article: {
			value: function template_article($cont, page){
				document.title = page.title + " — CSES";
				$cont.append(page.content.contents());
			},
		},
		dir: {
			value: function template_dir($cont, page){
				document.title = page.title + " — CSES";
				
				var l = $("<ul>");
				$cont.append(
					page.content.contents(),
					$("<h2>", {
						text: "Sub-articles",
					}),
					l
				);
				
				cses.Post.find({
					dir: page.id,
				}).then(function(pages){
					for (var i = 0; i < pages.length; i++) {
						var p = pages[i];
						
						$cont.append($("<li>")
							.append($("<a>", {
								href: "/"+p.id,
								text: p.title,
							}))
						);
					}
				});
			}
		}
	});
	Object.preventExtensions(self);
	return self;
});
