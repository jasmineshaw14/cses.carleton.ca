define(["cses", "store2", "site/Router", "site/session", "jquery"],
function(cses,    store,    Router,        session,        $){
	var r = {};
	
	session.restore();
	
	var content = $("<div>").appendTo("body");
	
	Object.defineProperties(r, {
		content: {value: content},
		router: {value: new Router(content)},
	});
	Object.preventExtensions(r);
	
	return r;
});
