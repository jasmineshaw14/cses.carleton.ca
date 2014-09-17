define([
	"scriptup",
	"cses",
	"site/ui/toolbelt",
	"site/templates",
	"jssignals1"
], function(
	scriptup,
	cses,
	toolbelt,
	templates,
	signals
) {
	"use strict";
	
	
	function uiEdit($cont, $e, post){
	}
	
	function PostView(post)
	{
		var self = this;
		
		this._editor = undefined;
		
		this.post = post;
		this.$root = scriptup("div", function(su){
			self._$view  = su("article");
			self._$save  = su("div");
			self._$admin = su("div");
		});
		
		this.render();
	}
	Object.preventExtensions(PostView);
	Object.defineProperties(PostView.prototype, {
		render: {
			value: function postview_render(){
				var self = this;
				
				var template = templates[this.post.type] || templates.page;
				
				this._$view.empty();
				var $post = $(template(this.post));
				this._$view.replaceWith($post);
				this._$view = $post;
			},
		},
		
		hideAdmin: {
			value: function postview_hideAdmin(){
				this._$admin.empty();
			},
		},
		
		renderAdmin: {
			value: function postview_renderAdmin(){
				
			},
		},
		
		edit: {
			value: function postview_edit(){
				var self = this;
				
				var deps = ["ckeditor4"]; // Lazy load.
				var editor;
				require(deps, function(CK){
					self._$view.attr("contenteditable", true);
					self._editor = CK.inline(self._$view.get(0),{
						extraPlugins: [
							"sourcedialog",
							"showblocks",
							"colorbutton",
							"colordialog",
							"dialogadvtab",
							"table",
							"tabletools",
							"tab",
						].join(","),
					});
				});
				
				this._$save.empty();
				scriptup(this._$save, function(su){
					su("form", function(su){
						this.on("submit", function(e){
							e.preventDefault();
							
							self.post.title = title.val();
							
							self.save().done(function(r){
								self.editStop();
							})
						});
						var title = su("input", {
							type: "text",
							val: self.post.title,
							placeholder: "Human Readable Title",
						});
						self.post.titlechanged.add(function(t){
							title.val(t);
						});
						su("button", "Save");
					});
				});
			},
		},
		
		editStop: {
			value: function postview_editStop(){
				this._editor.destroy();
				this.render();
				this._$save.empty();
			},
		},
		
		updateContent: {
			value: function postview_updateContent(){
				this.post.content = this._editor.getData();
			},
		},
		
		save: {
			value: function postview_save(){
				this.updateContent();
				return this.post.save();
			}
		}
	});
	Object.preventExtensions(PostView.prototype);
	
	return PostView;
});
