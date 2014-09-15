define(["jquery", "cses", "Paragon1", "scriptup", "typeahead010", "q1"],
function($, cses, Paragon, scriptup, _, Q)
{
	"use strict";
	
	function personstr(p) {
		var r = p.namefull;
		if (p.number)
			r += " (" + p.number + ")";
		return r;
	}
	
	var ttopt = {};
	var ttds = {
		name: "people",
		displayKey: "title",
		source: function fetch(q, cb){
			console.log(q);
			cses.TBTBook.find({
				title: q,
			}).then(function(r){
				return Q.all(r.map(function(b){ return b.load() }));
			}).then(function(books){
				cb(books);
			}).done();
		},
	};
	
	function TitleCompleter($i) {
		$i = $($i);
		
		// Super hack, typeahead doesn't work on nodes not yet in the DOM.
		setTimeout(function(self){
			$i.typeahead(ttopt, ttds);
		}, 300, this);
	}
	
	return TitleCompleter;
});
