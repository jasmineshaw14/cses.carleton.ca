define(["exports", "cses", "store2", "site/Router", "site/session", "jquery"],
function(r,         cses,    store,    Router,        session,        $){
	session.restore();
	
	var content = $("<div>").appendTo("body");
	
	Object.defineProperties(r, {
		content: {value: content},
		router: {value: new Router(content)},
	});
	Object.preventExtensions(r);
	
	return r;
});
