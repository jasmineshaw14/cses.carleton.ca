define(["cses"],
function(cses)
{
	"use strict";
	
	var ie = !!navigator.userAgent.match("MSIE");
	
	function b(hash, iehash){
		return cses.blobprefix + ((ie&&iehash)||hash);
	}
	
	return {
		logo: b("A8FDCF9610BBE191D79224D1AFC9D8A16037A66A", "32AAEA0C6B795D16B8F9D65D9CF53CDB99256324"),
		headerBasket: b("9FD1B313F9048B62ED4DF193350D8CBF040B3538", "9FD1B313F9048B62ED4DF193350D8CBF040B3538"),
	};
});
