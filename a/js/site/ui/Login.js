define(["scriptup", "jss", "q1", "site/theme", "site/session"],
function(scriptup, jss, Q, theme, session)
{
	"use strict";
	
	var style = new jss.StyleSet(
		new jss.Style({
			maxWidth: "16em",
			margin: "2em",
			textAlign: "center",
		}),
		new jss.Style("&::after", {
			content: "' '",
			display: "block",
			clear: "both",
		}),
		new jss.Style("& form", {
			boxSizing: "border-box",
		}),
		new jss.Style("& input[type='text'], & input[type='password']", {
			display: "block",
			width: "100%",
			boxSizing: "border-box",
			// textAlign: "center",
		}),
		new jss.Style("& button", {
			display: "inline-block",
			cssFloat: "right",
		})
	)
	
	function Login()
	{
		var self = this;
		this._done = Q.defer();
		this.done = this._done.promise;
		
		this.$root = scriptup("section", {
			class: style.classes,
		}, function(su){
			su("h1", "Login to CSES");
			su("form", {
				on: {
					submit: self._onsubmit.bind(self),
				}
			}, function(su){
				self._$user = su("input", {type: "text", placeholder: "email"});
				self._$pass = su("input", {type: "password", placeholder: "password"});
				su("button", "Login");
				self._$err = su("p", {
					css: {
						display: "none",
						color: theme.textBadColor,
						margin: "0.8em 0",
						textAlign: "left",
					},
				});
			});
		});
	}
	Object.preventExtensions(Login);
	Object.defineProperties(Login.prototype, {
		_onsubmit: {
			value: function(e){
				var self = this;
				e.preventDefault();
				
				self._$err.css("display", "none");
				
				session.login(this._$user.val(), this._$pass.val()).done(function(r){
					self._done.resolve();
				}, function(err){
					self._$err.text(err.msg);
					self._$err.css("display", "block");
				});
			},
		},
	});
	Object.preventExtensions(Login.prototype);
	
	return Login;
});
