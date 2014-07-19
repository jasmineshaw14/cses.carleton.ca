define(["jquery", "cses", "Paragon1", "scriptup", "typeahead010"],
function($, cses, Paragon, scriptup, _)
{
	"use strict";
	
	// var engine = new Bloodhound({
	// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
	// 	datumTokenizer: function(d){
	// 		return d;
	// 	},
	// });
	
	function personstr(p) {
		var r = p.namefull;
		if (p.number)
			r += " (" + p.number + ")";
		return r;
	}
	
	var ttopt = {};
	var ttds = {
		name: "people",
		displayKey: personstr,
		source: function fetch(q, cb){
			var num = q.match(/^\d+$/);
			cses.Person.find({
				number: num? q : undefined,
				name:   num? undefined : q,
			}).then(function(r){
				cb(r);
			}).done();
		},
	};
	
	function selected(e, datum){ $(this).data("person", datum) }
	
	function PersonCompleter(element) {
		this.$root = $(element);
		
		// Super hack, typeahead doesn't work on nodes not yet in the DOM.
		setTimeout(function(self){
			self.$root.typeahead(ttopt, ttds);
		}, 300, this);
		
		this.$root.on("typeahead:selected",      selected);
		this.$root.on("typeahead:autocompleted", selected);
		this.$root.on("typeahead:cursorchanged", selected);
	}
	Object.preventExtensions(PersonCompleter);
	Object.defineProperties(PersonCompleter.prototype, {
		value: {
			get: function personcompleter_value_get(){
				return this.$root.data("person");
			},
			set: function personcompleter_value_set(n){
				this.$root.data("person", n);
				console.log(n, personstr(n), this.value);
				this.$root.typeahead("val", personstr(n));
			}
		}
	});
	
	return PersonCompleter;
});
