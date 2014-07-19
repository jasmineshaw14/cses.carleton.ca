define(["jquery", "cses", "scriptup"],
function($, cses, scriptup)
{
	"use strict";
	
	function PersonAdd() {
		var name, namefull, number, email;
		var error;
		var form = scriptup("form", {
			on: {
				submit: function(e){
					e.preventDefault();
					
					var p = new cses.Person();
					p.name     = name.val()
					p.namefull = namefull.val();
					p.number   = number.val();
					p.emails   = [email.val()];
					p.save().done(function(){
						form.trigger("cses:personadd:added", p);
					}, function(r){
						error.text(r.msg);
					});
				},
			},
		}, function(su){
			su("label", {text: "Name "}, function(su){
				name = su("input", {type: "text", pattern: ".+"});
			}); su("br");
			su("label", {text: "Full Name "}, function(su){
				namefull = su("input", {type: "text", pattern: ".+"});
			}); su("br");
			su("label", {text: "Student Number "}, function(su){
				number = su("input", {type: "text", pattern: "\\d{9}"});
			}); su("br");
			su("label", {text: "Email "}, function(su){
				email = su("input", {type: "email"});
			}); su("br");
			su("button", {text: "Add"});
			error = su("p");
		});
		return form;
	}
	
	return PersonAdd;
});
