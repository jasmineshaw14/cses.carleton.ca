define(["jquery", "cses", "owl1"],
function($, cses, _owl)
{
	"use strict";
	
	function Banner()
	{
		var self = this;
		
		this.$root = $("<div>", {
			css: {
				textAlign: "center",
			},
		});
		this._banners = [];
		setTimeout(function(){self.update().done()}, 0);
	}
	Object.preventExtensions(Banner);
	Object.defineProperties(Banner.prototype, {
		update: {
			value: function banner_update(){
				var self = this;
				return cses.Banner.fetchAll().then(function(r){
					self._banners = r.banners;
					self._resize();
				});
			},
		},
		_resize: {
			value: function banner__resize(){
				var self = this;
				
				this.$root.empty();
				this._banners.forEach(function(b){
					var i = b.imageForWidth();
					self.$root.append($("<img>", {
						src: i.src,
						css: {
							width: "100%",
						},
					}));
				});
				this.$root.owlCarousel({
					navigation: true,
					singleItem: true,
					autoPlay: true,
					stopOnHover: true,
				});
			},
		},
	});
	Object.preventExtensions(Banner.prototype);
	
	return Banner;
});
