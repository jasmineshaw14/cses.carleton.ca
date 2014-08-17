define(["jquery", "cses", "unslider0"],
function($, cses, _unslider)
{
	"use strict";
	
	function Banner()
	{
		var self = this;
		
		this.$root = $("<div>", {
			class: "chrome",
			css: {
				position: "relative",
				display: "block",
				margin: "0 auto",
				maxWidth: "100%",
				visibility: "hidden",
				overflow: "auto",
				textAlign: "center",
			},
		});
		this._$list = $("<ul>").appendTo(this.$root);
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
				
				this._$list.empty();
				var maxh = 0;
				var maxw = 0;
				this._banners.map(function(b){
					var i = b.imageForWidth();
					if (i.height > maxh) maxh = i.height;
					if (i.width  > maxw) maxw = i.width;
					
					var r = $("<img>", {
						src: i.src,
						alt: i.desc,
					});
					if (b.href){
						r = $("<a>", {
							href: b.href,
						}).append(r);
					}
					
					return r;
				}).forEach(function(i){
					self._$list.append(
						$("<li>", {
							css:{
								cssFloat: "left",
								height: maxh+"px",
							},
						}).append(i)
					);
				});
				this.$root.css("width", maxw+"px");
				this.$root.css("visibility", "");
				this.$root.unslider({
					dots: true,
					delay: 5000,
				});
			},
		},
	});
	Object.preventExtensions(Banner.prototype);
	
	return Banner;
});
