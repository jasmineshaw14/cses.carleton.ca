define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"cses",
	"scriptup"
], function(
	$,
	mkgen,
	session,
	cses,
	scriptup)
{
	"use strict";
	
	return mkgen("Upload — CSES", function($cont){
		scriptup($cont, function(su){
			su("h1", "Admin Area");
			su("ul", function(su){
				[
					{href: "/people", text: "Search Users"},
					{href: "/people/new", text: "Create a User"},
					{href: "/admin/post/new", text: "Create a Post"},
					{href: "/admin/mailinglist", text: "Mailing List Subcription Requests"},
					{href: "/admin/upload", text: "Upload"},
					{href: "/admin/textbooktrade", text: "Textbook Trade"},
				].forEach(function(l){
					su("li", function(su){
						su("a", {
							text: l.text,
							href: l.href,
						});
					});
				});
			});
		});
	});
});
