define([
	"exports", "jquery", "store2", "site/router", "cses", "q1",
	"site/ui/lightbox", "site/ui/Login",
], function(
	self, $, store, router, cses, Q, Lightbox, Login
){
	"use strict";
	
	/** Session manager.
	 */
	Object.defineProperties(self, {
		/** Ask the user to login.
		 * 
		 * @param returnto The URL to return after logging in.
		 */
		loginRequest: {
			value: function session_login(returnto) {
				cses.authtoken.then(function(t){
					if (t) return;
					store.set("page-login-next", returnto);
					router.replace("/login");
				});
				return cses.authtoken;
			},
		},
		
		/** Popup a dialog asking the user to login.
		 * 
		 * @return A promise that resolves when the user is logged in or
		 *         rejected if the user doesn't log in.
		 */
		loginPopup: {
			value: function session_loginPopup(){
				return cses.authtoken.then(function(t){
					if (t) return; // Logged in already.
					
					var r = Q.defer();
					
					var lb = new Lightbox();
					var login = new Login();
					
					lb.$root.css({
						background: "white",
					});
					lb.$root.append(login.$root);
					lb.open = true;
					
					login.done.done(function(){
						r.resolve();
						lb.open = false;
					})
					lb.closed.addOnce(function(){
						r.reject();
					});
					
					return r.promise;
				})
			},
		},
		
		/** Restore the last session.
		 * 
		 * This is intended to be called upon application startup.
		 */
		restore: {
			value: function session_restore(){
				var t = store.get("authtoken");
				if (t) {
					return cses.authorize(t).catch(function(e){
						console.log(e); store.remove("authtoken")
					});
				}
				else
					return Q();
			},
		},
		/** Login with the provided username and password.
		 */
		login: {
			value: function session_login(user, pass) {
				return cses.authorize(user, pass).then(function(r){
					store.set("authtoken", r.json.token);
					console.log("Login Successful", r);
				}, function(err){
					store.remove("authtoken");
					throw err;
				});
			},
		},
		/** Logout.
		 */
		logout: {
			value: function session_logout() {
				store.clear("authtoken");
				return cses.unauthorize();
			},
		},
	});
	Object.preventExtensions(self);
	return self;
});
