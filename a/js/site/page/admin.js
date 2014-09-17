define([
	"q1",
	"site/page/admin/index",
	"site/page/admin/post",
	"site/page/admin/textbooktrade",
	"site/page/admin/upload",
], function(
	Q,
	index,
	post,
	tbt,
	upload
) {
	"use strict";
	
	return function(url){
		return Q.Promise(function(resolve, reject){
			var slug = url.path.split("/")[2] || "index";
			var page = {
				index: index,
				post: post,
				textbooktrade: tbt,
				upload: upload,
			}[slug];
			
			if (!page) reject("404");
			else resolve(Q().then(function(){
				return page(url);
			}));
		});
	}
});
