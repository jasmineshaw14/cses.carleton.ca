define(["jss"], function(jss){
	"use strict";
	
	return {
		chrome: {
			bg: "hsl(0,0%,97%)",
			headerFont: new jss.Style({
				fontFamily: "Montserrat, sans-serif",
				fontWeight: "900",
				textTransform: "uppercase",
			}),
			linkFont: new jss.Style({
				fontFamily: "Lato, sans-serif",
				fontWeight: "100",
			}),
		},
	};
});
