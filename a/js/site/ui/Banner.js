define(["jquery", "cses", "site/ui/MyBanner"],
function($, cses, MyBanner)
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
	}
	Object.preventExtensions(Banner);
	Object.defineProperties(Banner.prototype, {
		update: {
			value: function banner_update(path){
				var self = this;
				return cses.Banner.fetchAll(path).then(function(r){
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
							boxShadow: "0.1em 0.1em 0.1em hsla(0,0%,0%,0.2)",
						}
					});
					if (b.href) {
						r = $("<a>", {
							href: b.href,
						}).append(r);
					}
					
					self._$list.append($("<li>", {
						css: {
							padding: "0.2em",
						},
					}).append(r));
				});
			},
		},
	});
	Object.preventExtensions(Banner.prototype);
	
	return Banner;
});
