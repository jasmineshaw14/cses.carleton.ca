({
	appDir: "a/",
	dir: "build/a/",
	
	baseUrl: "js",
	//mainConfigFile: "a/js/bootstrap.js",
	
	paths: {
		site: "",
		cses0: "cses",
		
		jquery: "empty:",
		jssignals1: "empty:",
		q1: "empty:",
		requirejs: "empty:",
		store2: "empty:",
		underscore: "empty:",
	},
	deps: [ // Preload modules we know we will need.
		"cses0",
		"site/Page",
		"site/PageStatic",
		"site/PageGenerated",
		"site/page/index",
		
		"jquery",
		"jssignals1",
		"q1",
		"store2",
		"underscore",
		"url1",
	],
	
	//keepBuildDir: true,
	modules: [
		{
			name: "bootstrap",
			//include: ["almond"],
			include: ["requirejs"],
		},
	],
	useStrict: true,
	findNestedDependencies: true,
	optimize: "uglify2",
	optimizeCss: "none",
	generateSourceMaps: true,
	preserveLicenseComments: false,
})
