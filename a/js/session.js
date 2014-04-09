define(["jquery", "store2", "site/main", "cses0"],
function($,        store,    main,        cses){
	"use strict";
	
	/** Session manager.
	 */
	var self = {};
	Object.defineProperties(self, {
		/** Ask the user to login.
		 * 
		 * @param returnto The URL to return after logging in.
		 */
		loginRequest: {
			value: function session_login(returnto) {
				store.set("page-login-next", returnto);
				main.go("/login");
			},
		},
		/** Restore the last session.
		 * 
		 * This is intended to be called upon application startup.
		 */
		restore: {
			value: function session_restore(){
				var t = store.get("authtoken");
				if (t)
					cses.authorize(t).done();
			},
		},
		/** Login with the provided username and password.
		 */
		login: {
			value: function session_login(user, pass) {
				return cses.authorize(user, pass).then(function(r){
					store.set("authtoken", r.token);
					console.log("Login Successful", r);
				});
			},
		},
		/** Logout.
		 */
		logout: {
			value: function session_logout() {
				cses.unauthorize();
				store.clear("authtoken");
			},
		},
	});
	Object.preventExtensions(self);
	return self;
});
