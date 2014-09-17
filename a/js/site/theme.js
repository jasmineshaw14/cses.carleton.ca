define(["jss"], function(jss){
	"use strict";
	
	/** Generate a CSS hsl string.
	 * 
	 * @param h The hue from 0-360, defaults to 0.
	 * @param s The saturation from 0-1 defaults to 0.
	 * @param l The lightness from 0-1, defaults to 0.
	 * @param a The alpha from 0-1, defaults to 1.
	 */
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
	
	var accent = hsl(263, 0.49, 0.47);
	var accentContrast = hsl(0,0,1);
	
	new jss.Style("h1,h2", {
		color: accent,
	});
	
	new jss.Style("a", {
		color: accent,
	});
	new jss.Style("a:hover", {
		textDecoration: "underline",
	});
	
	new jss.Style("button",{
		margin: "0.2em 0",
		padding: "0.7em 1.2em",
		border: "none",
		background: accent,
		color: accentContrast,
		fontWeight: "bolder",
	});
	
	new jss.Style("input[type='text']," +
		"input[type='password']," +
		"input[type='number']," +
		"input[type='email']", {
		margin: "0.2em 0",
		padding: "0.3em 0.6em",
		fontSize: "1em",
		border: "none",
		background: hsl(0,0,0,0.2),
		color: accent,
		fontWeight: "bolder",
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
		sepBorder: "1px solid "+hsl(0,0,0.9),
		sepColor: hsl(0,0,0.9),
		textGoodColor:   hsl(139, 0.58, 0.3),
		textBadColor:    hsl(  0, 1, 0.5),
		textDeemphColor: hsl(  0, 0, 0.5),
		
		hoverMixin: function(selector){
			return new jss.Style(selector, {
				background: "hsla(0,0%,0%,0.1)",
			});
		}
	};
});
