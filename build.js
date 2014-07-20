({
	appDir: "a/",
	
	baseUrl: "js",
	//mainConfigFile: "a/js/bootstrap.js",
	
	paths: {
		jquery: "empty:",
		jssignals1: "empty:",
		q1: "empty:",
		store2: "empty:",
		typeahead010: "empty:",
		underscore: "empty:",
		// requirejs: "../../require",
	},
	deps: [ // Preload modules we know we will need.
		"jquery",
		"jssignals1",
		"q1",
		"store2",
		"underscore",
		"url1",
		
		"cses",
		"site/Page",
		"site/PageStatic",
		"site/PageGenerated",
		"site/page/index",
		"site/templates",
	],
	
	//keepBuildDir: true,
	modules: [
		{ name: "bootstrap",
			// include: ["requirejs"],
			
			override: {
				wrap: {
					start:
						// Load fallback require.js if needed.
						'+function(i){"use strict";' +
							'if(window.require)i();' +
							'else{' +
								'var s=document.createElement("script");' +
								's.src="https://cdnjs.cloudflare.com/ajax/' +
									'libs/require.js/2.1.11/require.min.js";' +
								's.onload=i;' +
								'document.head.appendChild(s);' +
							'}' +
						'}(function(){',
					end: '})',
				},
			},
		}, { name: "site/page/admin",
			exclude: ["bootstrap"],
		},
	],
	useStrict: true,
	findNestedDependencies: true,
	optimize: "uglify2",
	optimizeCss: "standard",
	generateSourceMaps: true,
	preserveLicenseComments: false,
})
