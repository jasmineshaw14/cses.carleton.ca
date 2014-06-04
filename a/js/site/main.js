define(["exports", "cses", "store2", "site/router", "site/session", "jquery"],
function(r,         cses,    store,   router,        session,        $){
	session.restore();
	
	// Object.defineProperties(r, {
	// });
	Object.preventExtensions(r);
	
	return r;
});
