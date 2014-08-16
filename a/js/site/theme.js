define(["jss"], function(jss){
	"use strict";
	
	function hsl(h,s,l,a) {
		if (typeof s == "undefined") s = 0;
		if (typeof l == "undefined") l = 0;
		if (typeof a == "undefined") a = 1;
		
		var f = a == 1? "hsl" : "hsla";
		
		h = ~~h;
		s = s*100 + "%"; // CSS hsl is insane.
		l = l*100 + "%"; //
		
		return f+"("
			+ h + ", "
			+ s + ", "
			+ l
			+ (a != 1? ", "+a : "")
			+ ")";
	}
	
	console.log(hsl(), hsl(120,0.5,0.5), hsl(240,0,1,0.5));
	
	var accent = hsl(263, 0.49, 0.47);
	
	new jss.Style("h1", {
		color: accent,
	});
	
	new jss.Style("a", {
		color: accent,
	});
	new jss.Style("a:hover", {
		textDecoration: "underline",
	});
	
	return {
		chrome: {
			bg: "hsl(0,0%,97%)",
			headerFont: new jss.Style({
				fontFamily: "Montserrat, sans-serif",
				fontWeight: "900",
				textTransform: "uppercase",
			}),
			headerLinkFont: new jss.Style({
				fontFamily: "Lato, sans-serif",
				fontWeight: "100",
			}),
			linkFont: new jss.Style({
				fontFamily: "Lato, sans-serif",
				fontWeight: "300",
			}),
		},
	};
});
