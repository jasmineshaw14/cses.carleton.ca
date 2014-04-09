define(["site/Page"],
function(Page)
{
	"use strict";
	
	/** A factory for generating static pages.
	 * 
	 * @param title The title of the page.
	 * @param $content A jQuery object to use as the content of the page.
	 * @return a subclass of Page.
	 */
	return function makestatic(title, $content) {
		function PageStatic() {
			Page.apply(this, arguments); // Call super.
		}
		Object.preventExtensions(PageStatic);
		PageStatic.prototype = Object.create(Page.prototype, {
			constructor: {value: Page},
			
			load: {
				value: function PageStatic_load(){
					document.title = title;
					this.$cont.append($content);
				},
			},
			unload: {
				value: function PageStatic_unload(){
					$content.detach();
				},
			},
		});
		Object.preventExtensions(PageStatic.prototype);
		
		return PageStatic;
	}
});
