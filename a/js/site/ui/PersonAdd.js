define(["jquery", "cses", "scriptup"],
function($, cses, scriptup)
{
	"use strict";
	
	function PersonAdd() {
		var name, last, number, email;
		var error;
		var form = scriptup("form", {
			on: {
				submit: function(e){
					e.preventDefault();
					
					var p = new cses.Person();
					p.name     = name.val()
					p.namefull = name.val()+" "+last.val();
					p.number   = number.val() || undefined;
					p.emails   = [email.val()];
					p.save().done(function(){
						form.trigger("cses:personadd:added", p);
					}, function(r){
						error.text(r.msg);
					});
				},
			},
		}, function(su){
			su("label", {text: "First Name "}, function(su){
				name = su("input", {type: "text", required: true, pattern: ".+"});
			}); su("br");
			su("label", {text: "Last Name "}, function(su){
				last = su("input", {type: "text", required: true, pattern: ".+"});
			}); su("br");
			su("label", {text: "Student Number "}, function(su){
				number = su("input", {type: "text", required: true, pattern: "\\d{9}|"});
			}); su("br");
			su("label", {text: "Email "}, function(su){
				email = su("input", {type: "email", required: true});
			}); su("br");
			su("button", {text: "Add"});
			error = su("p");
		});
		return form;
	}
	
	return PersonAdd;
});
