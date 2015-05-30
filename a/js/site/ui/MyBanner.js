define(["jss"],
function(jss)
{
	"use strict";
	
	var style = new jss.StyleSet(
		new jss.Style({
			position: "relative",
			display: "block",
			padding: "0",
			overflow: "hidden",
		}),
		new jss.Style("&>ul", {
			padding: "0",
			margin: "0",
			whiteSpace: "nowrap", // Don't use pre to avoid webkit bug.
		}),
		new jss.Style("&>ul>li", {
			display: "inline-block",
			width: "100%",
			margin: "0",
			border: "none",
			listStyle: "none",
			
			textAlign: "center",
			verticalAlign: "middle",
			
			transition: "transform 0.8s ease-in-out",
		}),
		new jss.Style("&>ol", {
			boxSizing: "content-box",
			position: "absolute",
			width: "1em",
			top: "0",
			bottom: "0",
			right: "0",
			padding: "1em",
			textAlign: "right",
			pointerEvents: "none",
		}),
		new jss.Style("&>ol>li", {
			height: "1em",
			width: "100%",
			marginBottom: "0.4em",
			padding: "0",
			border: "3px solid white",
			borderRadius: "50%",
			boxShadow: "0.1em 0.1em 0.2em hsla(0,0%,0%,0.6)," +
			           "0.1em 0.1em 0.2em hsla(0,0%,0%,0.6) inset",
			listStyle: "none",
			pointerEvents: "auto",
		}),
		new jss.Style("&>ol>li.-MyBanner-active", {
			background: "white",
			boxShadow: "0.1em 0.1em 0.2em hsla(0,0%,0%,0.6)",
		})
	);
	
	var slideLeft  = function(e, i){ e.style.transform = "translateX("+(-i-1)+"00%)" };
	var slideIn    = function(e, i){ e.style.transform = "translateX("+( -i )+"00%)" };
	var slideRight = function(e, i){ e.style.transform = "translateX("+(-i+1)+"00%)" };
	
	function MyBanner() {
		var self = this;
		
		this.root = document.createElement("div");
		this.root.addEventListener("mouseover", function(e){ self.hold()    });
		this.root.addEventListener("mouseout",  function(e){ self.release() });
		this.root.className = style.classes;
		
		this.list = document.createElement("ul");
		this.list.className = "banners"
		this.root.appendChild(this.list);
		
		this.buttons = document.createElement("ol");
		this.buttons.className = "buttons";
		this.buttons.addEventListener("click", e => {
			console.log(e.target);
			console.log(style.selector+">ol>li");
			if (!e.target.matches(style.selector+">ol>li")) return;
			
			console.log("Matches");
			
			var i = 0;
			var cur = e.target;
			while (cur = cur.previousSibling)
				i++;
			
			console.log(i);
			this.current = i;
		});
		this.root.appendChild(this.buttons);
		
		this.in  = MyBanner.slideIn;
		this.out = MyBanner.slideOut;
		this.holdOnHover = true;
		
		this._c = 0;
		this._timer = undefined;
		this._timerinterval;
		
		this.holds = 0;
		this._held = false;
		
		if ("WeakMap" in window && "MutationObserver" in window) {
			this._md = new WeakMap();
			new MutationObserver((records, mo) => {
				records.forEach(r => {
					for (var i = 0; i < r.addedNodes.length; ++i)
						this._childAdded(r.addedNodes[i]);
					for (var i = 0; i < r.removedNodes.length; ++i)
						this._childRemoved(r.removedNodes[i]);
				});
			}).observe(this.list, {childList: true});
		}
		
		window.b = this;
	}
	Object.defineProperties(MyBanner, {
		slideIn:  {value: [slideRight,  slideIn]},
		slideOut: {value: [slideIn, slideLeft]},
	});
	Object.preventExtensions(MyBanner);
	Object.defineProperties(MyBanner.prototype, {
		current: {
			get: function mybanner_current_get(){ return this._c },
			set: function mybanner_current_set(i){
				if (!this.list.children.length) return;
				
				i = ~~i % this.list.children.length;
				if (i < 0) i += this.list.children.length;
				
				if (i == this._c) return;
				
				var src = this.list.children[this._c];
				var dst = this.list.children[i];
				
				dst.style.transition = "none";
				
				this.out[0](dst, i);
				this.in[0](dst, i);
				
				var srcbutton = this.buttons.children[this._c];
				var dstbutton = this.buttons.children[i]
				srcbutton.classList.remove("-MyBanner-active");
				dstbutton.classList.add("-MyBanner-active");
				
				dst.offsetHeight; // Force layout to avoid transition.
				dst.style.transition = "";
				
				this.out[1](src, this._c);
				this.in[1](dst, i);
				
				this._c = i
				this.resetTimer();
			},
		},
		advance: {value: function mybanner_advance(){ return this.current++ }},
		interval: {
			get: function mybanner_interval_get(){ return this._timerinterval },
			set: function mybanner_intercal_set(s){
				s = +s;
				
				if (this.playing && s == this._timerinterval) return;
				
				this._timerinterval = s;
				this.playing = true; // Automatically start when interval is set.
				
				this.resetTimer();
			},
		},
		playing: {
			get: function mybanner_playing_get(){ return !!this._timer },
			set: function mybanner_playing_set(p){
				if (p == !!this._timer) return;
				
				if (p)
					this._timer = setTimeout(this.advance.bind(this), this.interval*1000);
				else
					this._timer = clearTimeout(this._timer), undefined;
			},
		},
		resetTimer: {
			value: function mybanner_resetTimer(){
				if (!this.playing) return;
				
				this.playing = false;
				this.playing = true
			},
		},
		hold: {
			value: function mybanner_hold(){
				this.holds++;
				if (this.playing) this._held = true;
				this.playing = false;
			},
		},
		release: {
			value: function mybanner_release(){
				if (!this.holds) throw Error("Attempt to release unheld banner.");
				if (--this.holds) return; // More holds.
				
				if (this._held) this.playing = true;
				
				this._held = false;
			}
		},
		clear: {
			value: function mybanner_clear(){
				this.list.innerHTML = '';
			},
		},
		_childAdded: {
			value(c) {
				var info = {
					button: document.createElement("li"),
				};
				
				var next = c.nextSibling;
				var nextd;
				while (next && !(nextd = this._md.get(next)))
					next = next.nextSibling;
					
				if (next) {
					this.buttons.insertBefore(nextd.button, info.button);
				} else {
					this.buttons.appendChild(info.button);
				}
				
				this._md.set(c, info);
			},
		},
		_childRemoved: {
			value(c) {
				var info = this._md.get(c);
				info.button.parentNode.removeChild(info.button);
			},
		},
	});
	Object.preventExtensions(MyBanner.prototype);
	
	return MyBanner;
});
