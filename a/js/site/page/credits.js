define(["site/PageStatic", "scriptup"],
function(mkstatic,          scriptup){
	return mkstatic("Credits — CSES", scriptup("div", function(su){
		su("h1", {text: "Credits"});
		su("h2", {text: "Libraries"});
		
		function lib(name, url, text) {
			su("h3", function(su){ su("a", {text: name, href: url}) });
			su("p", {text: text});
		}
	}));
});
