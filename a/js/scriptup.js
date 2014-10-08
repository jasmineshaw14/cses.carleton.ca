// Copyright 2013-2014 Kevin Cox

/*******************************************************************************
*                                                                              *
*  This software is provided 'as-is', without any express or implied           *
*  warranty. In no event will the authors be held liable for any damages       *
*  arising from the use of this software.                                      *
*                                                                              *
*  Permission is granted to anyone to use this software for any purpose,       *
*  including commercial applications, and to alter it and redistribute it      *
*  freely, subject to the following restrictions:                              *
*                                                                              *
*  1. The origin of this software must not be misrepresented; you must not     *
*     claim that you wrote the original software. If you use this software in  *
*     a product, an acknowledgment in the product documentation would be       *
*     appreciated but is not required.                                         *
*                                                                              *
*  2. Altered source versions must be plainly marked as such, and must not be  *
*     misrepresented as being the original software.                           *
*                                                                              *
*  3. This notice may not be removed or altered from any source distribution.  *
*                                                                              *
*******************************************************************************/
+function(root, factory){
	"use strict";
	
	if (typeof define == "function" && define.amd) { // AMD
		define(["jquery"], factory);
	} else if (typeof module == "object" && module.exports) { // Node
		module.exports = factory(
			require("jquery")
		);
	} else {
		root.scriptup = factory(jQuery);
	}
}(this, function ParagonFactory($){
	"use strict";
	
	return function scriptup(tag, props, cont) {
		if (typeof props == "string") {
			props = {text: props};
		}
		if (typeof props != "object") {
			cont = props;
			props = undefined;
		}
		
		var r;
		if (typeof tag == "string" && tag.match(/^[-A-Za-z0-9]+$/))
			r = $("<"+tag+">", props);
		else {
			r = $(tag);
			for (var k in props) {
				if (k in r) r[k](props[k]);
				else        r.attr(k, props[k]);
			}
		}
		
		if (typeof cont == "function") cont.call(r, scriptup.bind(r));
		
		if (this instanceof $) this.append(r);
		return r;
	};
});
