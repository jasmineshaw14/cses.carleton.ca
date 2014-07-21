define(["cses"],
function(cses)
{
	"use strict";
	
	var ie = !!navigator.userAgent.match("MSIE");
	
	function b(hash, iehash){
		return cses.blobprefix + ((ie&&iehash)||hash);
	}
	
	return {
		logoBordered: b("74942A93AF264C186677F5FAC01C80B672705948","C21B19A9F42B1BB8C4DBB5096144ECAD3A29AF67"),
	};
});
