define([
	"jquery", "cses", "site/ui/PersonCompleter", "site/ui/PersonAdd",
	"site/ui/lightbox",
], function(
	$, cses, PersonCompleter, PersonAdd, LightBox
)
{
	"use strict";
	
	function PersonSelect() {
		var self = this;
		
		this.$root = $("<span>");
		this.comp  = new PersonCompleter($("<input>", {type: "text", appendTo: this.$root}));
		$("<button>", {
			type: "button",
			text: "New Person",
			on: {
				click: function(e) {
					e.preventDefault();
					var lb = new LightBox();
					var pa = PersonAdd();
					pa.on("cses:personadd:added", function(e, p){
						lb.open = false;
						self.comp.value = p;
					});
					lb.$root.append(pa);
					lb.styleFloating = true;
					lb.open = true;
				},
			},
			appendTo: this.$root,
		});
	}
	Object.preventExtensions(PersonSelect);
	Object.defineProperties(PersonSelect.prototype, {
		value: {
			get: function personselect_value_get(){
				return this.comp.value
			},
			set: function personselect_value_set(n){
				return this.comp.value = n;
			}
		}
	});
	
	return PersonSelect;
});
