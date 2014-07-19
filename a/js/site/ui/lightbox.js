define(["jquery"],
function($)
{
	"use strict";
	
	var $cover = $("<div>", {
		css: {
			position: "fixed",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			
			opacity: 0,
			background: "hsla(0, 0%, 0%, 0.1)",
			
			textAlign: "center",
			overflow: "auto",
			
			transitionProperty: "opcaity",
			transitionDuration: "0.2s",
		},
	});
	
	function LightBox()
	{
		var self = this;
		
		this.$root = $("<div>", {
			css: {
				display: "inline-block",
				postition: "absolute",
				margin: "4em auto",
				textAlign: "initial",
			},
		});
		this._open = false;
		this._bgclose = function(e){ if (this == e.target) self.open = false };
	}
	Object.preventExtensions(LightBox);
	Object.defineProperties(LightBox.prototype, {
		open: {
			get: function lightbox_open_get(){ return this._open },
			set: function lightbox_open_set(val) {
				val = !!val;
				if (val == this.open) return;
				
				var self = this;
				
				if (val) {
					$cover.on("click", this._bgclose);
					
					this.$root.css({
						top: $(window).scrollTop(),
					});
					this.$root.appendTo($cover);
					$cover.appendTo(document.body);
					setTimeout(function(){$cover.css("opacity", "1")}, 0);
				} else {
					$cover.css("opacity", 0);
					$cover.off("click", this._bgclose);
					$cover.one("transitionend", function(e){
						console.log("CALLED");
						$cover.detach();
						self.$root.detach();
					});
				}
				
				this._open = val;
			},
		},
		styleFloating: {
			set: function lightbox_styleFloating_set(val){
				this.$root.css({
					padding:      val? "1em" : 0,
					borderRadius: val? "1em" : 0,
					background:   val? "white" : "none",
					boxShadow:    val? "0 0 3em black" : "none",
				});
			},
		},
	});
	Object.preventExtensions(LightBox.prototype);
	
	return LightBox;
});
