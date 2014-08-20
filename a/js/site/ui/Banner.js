define(["jquery", "cses", "unslider0", "site/ui/MyBanner"],
function($, cses, _unslider, MyBanner)
{
	"use strict";
	
	function Banner()
	{
		var self = this;
		
		this.banner = new MyBanner();
		this.banner.interval = 7;
		
		this.$root = $(this.banner.root);
		this._$list = $(this.banner.list);
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
				this._banners.forEach(function(b){
					var i = b.imageForWidth();
					
					var r = $("<img>", {
						src: i.src,
						alt: i.desc,
						css: {
							width: "100%",
						}
					});
					if (b.href) {
						r = $("<a>", {
							href: b.href,
						}).append(r);
					}
					
					self._$list.append($("<li>").append(r));
				});
			},
		},
	});
	Object.preventExtensions(Banner.prototype);
	
	return Banner;
});
