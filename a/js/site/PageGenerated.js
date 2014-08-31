define(["site/Page", "q1"],
function(Page, Q)
{
	"use strict";
	
	/** Factory for creating generated Pages.
	 * 
	 * This function returns a class that inherits from Page and generates
	 * content by calling the provided functions.
	 * 
	 * @param titlegen Either the title, or a function that returns a title when
	 *                 called.  This argument may be omitted or set to `false`
	 *                 to not set the title.
	 * @param contentgen A function that will be called with a single argument
	 *                   of a jQuery wrapped element into which to render the
	 *                   page.  The function must not reuse jQuery elements as
	 *                   the generated `#unload` method uses `$el.empty()` to
	 *                   clean up.
	 * @return A class.
	 */
	return function makegen(titlegen, contentgen) {
		if (!contentgen) {
			contentgen = titlegen;
			titlegen = false;
		}
		
		function PageGenerated() {
			Page.apply(this, arguments); // Call super.
		}
		Object.preventExtensions(PageGenerated);
		PageGenerated.prototype = Object.create(Page.prototype, {
			constructor: {value: PageGenerated},
			
			load: {
				value: function PageGenerated_load(){
					if (titlegen !== false)
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
		
		var pagep = Q.resolve(PageGenerated);
		return function(){ return pagep };
	}
});
