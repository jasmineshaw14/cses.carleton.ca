define(["jquery", "cses", "Paragon1", "scriptup", "typeahead010", "jssignals1"],
function($, cses, Paragon, scriptup, _, jssignals)
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
	
	function PersonCompleter(element) {
		var self = this;
		this.$root = $(element);
		
		// Super hack, typeahead doesn't work on nodes not yet in the DOM.
		setTimeout(function(self){
			self.$root.typeahead(ttopt, ttds);
		}, 300, this);
		
		function selected(e, datum){
			self._value = datum;
			self.selected.dispatch(datum);
		}
		
		this.$root.on("typeahead:selected",      selected);
		this.$root.on("typeahead:autocompleted", selected);
		this.$root.on("typeahead:cursorchanged", selected);
		
		this.selected = new jssignals.Signal();
	}
	Object.preventExtensions(PersonCompleter);
	Object.defineProperties(PersonCompleter.prototype, {
		value: {
			get: function personcompleter_value_get(){
				return this._value;
			},
			set: function personcompleter_value_set(n){
				this._value = n;
				this.$root.typeahead("val", personstr(n));
			}
		}
	});
	
	return PersonCompleter;
});
