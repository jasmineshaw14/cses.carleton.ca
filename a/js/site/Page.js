define(["jquery"], function($){
	"use strict";
	
	/** A page.
	 * 
	 * @param $cont A jQuery element which to render the page into.
	 */
	function Page(url) {
		this.url = url;
		this.title = "Title Not Set";
		this.$root = this.$cont = $("<div>");
	}
	Object.defineProperties(Page.prototype, {
		/** Load the page into the element.
		 * 
		 * This loads the page into the provided to the constructor.  The
		 * the element is guaranteed to be empty.
		 */
		load: {
			value: function Page_render() {
				this.$root.html("<h1>No content</h1><p>This page needs to provide some content.</p>");
			},
		},
		/** Unload the page from the element.
		 * 
		 * This removes the page from the provided element.  The element must be
		 * empty afterwards.
		 */
		unload: {
			value: function Page_unload() {
				this.$root.remove();
			}
		},
	});
	
	return Page;
});
