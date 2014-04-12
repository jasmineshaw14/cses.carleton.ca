define(function(){
	"use strict";
	
	var paths = {
		//requirejs: "require",
		site: "/a/js",
		cses0: "/a/js/cses",
		
		jquery: [ // jQuery won't let us name it.
			"https://cdn.jsdelivr.net/jquery/2.1.0/jquery.min",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min",
		],
		jssignals1: [
			"https://cdn.jsdelivr.net/js-signals/1.0.0/signals.min",
			"https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min",
		],
		q1: [
			"https://cdnjs.cloudflare.com/ajax/libs/q.js/1.0.0/q.min",
			"http://yourjavascript.com/1247410609/q-min.js", // Note, also cloudflare.
			"https://googledrive.com/host/0B5Q4xFi89w8sSHBHaUtMeXM5c28", // A slow worst-case.
		],
		store2: [
			//"https://cdn.jsdelivr.net/store/2.1.2/store2.min", Too old, doesn't define itself.
			"https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.14/store.min",
		],
		underscore: [ // Underscore won't let us name it.
			"https://cdn.jsdelivr.net/underscorejs/1.6.0/underscore-min",
			"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
		],
		url1: "/a/js/url",
	};
	
	if (window.location.hostname == "localhost") {
		///// Source versions for easy debugging.
		// backbone has source map.
		paths.jquery.unshift(
			"https://cdn.jsdelivr.net/jquery/2.1.0/jquery",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery");
		paths.jssignals1.unshift(
			"https://cdn.jsdelivr.net/js-signals/1.0.0/signals",
			"https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals");
		paths.q1.unshift(
			"https://cdnjs.cloudflare.com/ajax/libs/q.js/1.0.0/q");
		//paths.store2.unshift( Doesn't define itself.
		//	"https://cdn.jsdelivr.net/store/2.1.2/store2");
		// underscore has source map.
	}
	
	require.config({
		baseUrl: "/dev/null",
		paths: paths,
		waitSeconds: 15,
		//enforceDefine: true,
	});
	
	// Turn on for better error messages.
	require(["q1"],function(Q){Q.longStackSupport = true});
	// Start
	require(["site/main"], function(main){});
});
