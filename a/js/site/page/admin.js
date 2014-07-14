define(["jquery", "site/PageDefer", "site/session"],
function($,        mkdefer,          session)
{
	"use strict";
	
	return mkdefer(function(){
		var path = location.pathname.split("/")[2];
		return "site/page/admin/" + (path? path : "index");
	});
});
