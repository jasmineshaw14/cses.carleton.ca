define(["exports", "cses", "store2", "site/router", "site/session", "jquery"],
function(r,         cses,    store,   router,        session,        $){
	"use strict";
	
	session.restore();
	router.load(location.pathname.substr(1));
	
	// Object.defineProperties(r, {
	// });
	Object.preventExtensions(r);
	
	return r;
});
