define(["site/Page"],
function(Page)
{
	"use strict";
	
	/** Factory for creating generated Pages.
	 * 
	 * This function returns a class that inherits from Page and generates
	 * content by calling the provided functions.
	 * 
	 * @param titlegen Either the title, or a function that returns a title when
	 *                 called.
	 * @param contentgen A function that will be called with a single argument
	 *                   of a jQuery wrapped element into which to render the
	 *                   page.  The function must not reuse jQuery elements as
	 *                   the generated `#unload` method uses `$el.empty()` to
	 *                   clean up.
	 * @return A class.
	 */
	return function makegen(titlegen, contentgen) {
		function PageGenerated() {
			Page.apply(this, arguments); // Call super.
		}
		Object.preventExtensions(PageGenerated);
		PageGenerated.prototype = Object.create(Page.prototype, {
			constructor: {value: Page},
			
			load: {
				value: function PageGenerated_load(){
					document.title = (typeof titlegen == "function")?titlegen():titlegen;
					contentgen(this.$cont);
				},
			},
			unload: {
				value: function PageGenerated_unload(){
					this.$cont.empty();
				},
			},
		});
		Object.preventExtensions(PageGenerated.prototype);
		
		return PageGenerated;
	}
});
