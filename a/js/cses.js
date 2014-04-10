+function(root, cses){
	"use strict";
	
	if (typeof define == "function" && define["amd"]) { // AMD
		define(["jquery", "q1", "url1"], cses);
	} else if (typeof module == "object" && module.exports) { // Node
		module["exports"] = cses(
			require("jquery"),
			require("q"),
			require("url")
		);
	} else {
		root["cses"] = cses(jQuery, Q, url);
	}
}(this, function CSES($, Q, URL){
	"use strict";
	var cses = {};
	var api = URL.parse("https://api.cses.carleton.ca");
	if (window && window.location.hostname == "localhost")
		api = URL.parse("http://localhost:8080");
	var authtoken_ = Q("");
	
	var WM = WeakMap;
	if (typeof WM != "function") {
		// Oh noes!  Define our fully compliant WeakMap shim.
		WM = function FakeWeakMap(){};
		Object.defineProperties(WM, {
			get: {value:function WM_get(k, v){return k["_FakeWeakMapPriv"]}},
			set: {value:function WM_set(k, v){
				Object.defineProperty(k, "_FakeWeakMapPriv", {writable:true});
				k["_FakeWeakMapPriv"] = v;
			}},
		});
	}
	
	/** A Person.
	 * 
	 * A person has the following attributes.
	 * 
	 * @property {String} id A hex string uniquely identifying the user.
	 * @property {String} name Their informal name, this is what you should call them.
	 * @property {String} namefull Their legal name.
	 * @property {String} perm An array of permissions they have.
	 *
	 * @class Person
	 * @param id {String} The user id.
	 */
	function Person(id) {
		this.id = id; //|| cses.authuser.id;
		this.perm = [];
		this.name = "";
		this.namefull = "";
	}
	Object.preventExtensions(Person);
	Object.defineProperties(Person.prototype, {
		/** Load fields from server.
		 * 
		 * This function updates all fields from the values on the server.
		 * 
		 * @return [Q.Promise] A promise.
		 */
		load: {
			value: function Person_load() {
				var self = this;
				
				return cses.request("GET", "/person/"+this.id).then(function(r){
					self.id       = r.id;
					self.perm     = r.perm;
					self.name     = r.name;
					self.namefull = r.namefull;
				});
			},
		},
		
		/** Persist changes to server.
		 * 
		 * This function persists set fields to the server.
		 * 
		 * @return [Q.Promise] A promise.
		 */
		save: {
			value: function Person_save(){
				return cses.request("PUT", "/person/"+this.id, {
					post: {
						name: this.name || undefined,
						namefull: this.namefull || undefined,
					},
				});
			},
		},
	});
	Object.preventExtensions(Person.prototype);
	
	Object.defineProperties(cses, {
		/** Make a raw request to the API.
		 * 
		 * Note: Try to avoid this method, instead use the higher-level methods
		 * and classes provided.
		 * 
		 * @param method [string] containing the HTTP method to use.
		 * @param path [String] the request URL path component.
		 * @param opt [Object] An options object.  The following keys have
		 *   meaning:
		 *   - auth: If provided is used as the authorization token for the
		 *       request.  Otherwise the global one is.
		 *   - get: If provided it is a object that will be used to build the
		 *       query string.
		 *   - post:
		 *       If provided will be serialized and used as the body of the
		 *       request.
		 * 
		 * @return [Promise<Object>] The response.
		 */
		request: {
			value: function CSES_request(method, path, opt) {
				opt = opt || {};
				if (typeof opt.auth == "undefined") opt.auth = cses.authtoken;
				
				api.path = path;
				api.get  = opt.get;
				var burl = URL.build(api);
				
				return Q(opt.auth).then(function(auth){
					var r = Q.defer();
					
					var headers = {
						"Content-Type": "application/json",
					};
					if (auth)
						headers["Authorization"] = "token "+auth;
					
					$.ajax({
						method: method,
						url: burl,
						
						headers: headers,
						
						contentType: opt.post ? "application/json" : undefined,
						data: opt.post ? JSON.stringify(opt.post) : undefined,
						dataType: "text",
					}).then(function(data, status, xhr) {
						//console.log(xhr.responseText, xhr);
						r.resolve(xhr.responseText);
					}, function(xhr, status, error) {
						if ( error === "" ) { // jQuery sucks.
							console.log("Error, couldn't connect to API!");
							r.reject({e:503, msg: "Could not connect to API."});
						}
						//console.log(xhr.responseText, xhr);
						r.resolve(xhr.responseText);
					});
					
					return r.promise;
				}).then(function(r) {
					var j = JSON.parse(r);
					console.log(burl, j);
					return j;
				});
			},
			enumerable: true,
		},
		
		/** The default authorization for requests.
		 * 
		 * This property will read a promise that will never be rejected.
		 * Writing a promise to this value will set the promise however the
		 * passed in promise must be fulfilled, never rejected.
		 * 
		 * The promise will be fulfilled with the auth token or "".
		 */
		authtoken: {
			get: function CSES_authtoken_get(){
				return authtoken_;
			},
			set: function CSES_authtoken_set(tokp) {
				authtoken_ = Q(tokp).then(function(tok){
					if (typeof tok != "string") tok = "";
					
					if (!tok) {
						cses.authperm  = [];
						cses.authuser  = undefined;
					}
					return tok;
				});
			},
			enumerable: true,
		},
		/** A Person representing the auth token's user.
		 * 
		 * Note that this is not necessarily `load`ed.
		 * 
		 * This will be a valid user when `cses.authtoken` is fulfilled with a
		 * non-empty string.  This will be `undefined` when `cses.authtoken` is
		 * fulfilled with an empty string.
		 */
		authuser: {writable: true},
		/** The current auth token's permissions.
		 * 
		 * This is an array of strings representing the permissions.
		 * 
		 * This will always be an array but it will be empty when
		 * `cses.authtoken` is an empty string.
		 */
		authperm: {value: [], writable: true},
		
		/** Login to the API.
		 * 
		 * If called with two arguments they will be used as the username and
		 * password to request a new auth token.
		 * 
		 * If called with one argument it will be assumed to be an auth token
		 * and it will be validated and used to fetch the user information.
		 *
		 * Returns a promise that will be fulfilled with an undefined value if
		 * the login was successful, and rejected with an undefined value if
		 * the login failed.
		 */
		authorize: {
			value: function CSES_authorize(user, pass) {
				var def = Q.defer();
				cses.authtoken = def.promise;
				
				// If one argument, authtoken provided.
				if (typeof pass == "undefined") {
					return cses.request("GET", "/auth", {
						auth: user,
					}).then(function(r){
						cses.authperm = r.perm;
						cses.authuser = new Person(r.user);
						def.resolve(user);
						return r;
					}, function(r){
						def.resolve(false);
						throw r;
					});
				}
				
				// Two arguments, user/pass.
				return cses.request("POST", "/auth", {
					auth: false,
					post: {
						user: user,
						pass: pass,
					},
				}).then(function(r){
					cses.authperm = r.perm;
					cses.authuser = r.user;
					def.resolve(r.token);
					return r;
				}, function(r){
					def.resolve(false);
					throw r;
				});
			},
			enumerable: true,
		},
		/** Log out.
		 * 
		 * This removes the current auth token from the library and invalidates
		 * it on the server.
		 * 
		 * @return A promise that will be fulfilled when the token has been
		 *         successfully invalidated.
		 */
		unauthorize: {
			value: function CSES_unauthorize(){
				var r = cses.request("POST", "/auth/invalidate");
				cses.authtoken = false;
				return r;
			},
		},
		
		/** The Person constructor.
		 */
		Person: {value: Person},
	});
	Object.preventExtensions(cses);
	
	return cses;
});
