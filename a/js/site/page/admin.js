define([
	"q1",
	"site/page/admin/index",
	"site/page/admin/textbooktrade",
	"site/page/admin/upload",
], function(
	Q,
	index,
	tbt,
	upload
) {
	"use strict";
	
	return function(url){
		return Q.Promise(function(resolve, reject){
			var slug = url.path.split("/")[2] || "index";
			var page = {
				index: index,
				textbooktrade: tbt,
				upload: upload,
			}[slug];
			
			if (!page) reject(404);
			else resolve(Q().then(function(){
				return page(url);
			}));
		});
	}
	return mkdefer(function(){
		var path = location.pathname.split("/")[2];
		return "site/page/admin/" + (path? path : "index");
	});
});
