/*\
title: $:/supp-info/core/modules/filters/jsondelete.js
type: application/javascript
module-type: filteroperator

Filter operator for deleting JSON value at indexed path

\*/

"use strict";

exports["jsondelete"] = function(source,operator,options) {
	var results = [];
	source(function(tiddler,title) {
		var data = $tw.utils.parseJSONSafe(title,title);
		if(data) {
			const res = deepDelete(operator.operands)(data);
			results.push(JSON.stringify(res));
		}
	});
	return results;
};

const deepDelete = ([first, ...rest] = []) => (obj, 
	p = Number(first), 
	a = p >= 0 ? p : Array.isArray(obj) && Math.max(0, obj.length + p), 
) => 
	first == undefined 
		? obj
		: Array.isArray(obj)
			? rest.length == 0
				? [...obj.slice(0, a), ...obj.slice(a + 1)]
				: [...obj.slice(0, a), deepDelete(rest)(obj[a]), ...obj.slice(a + 1)]
			: rest.length == 0
				? Object.fromEntries (Object.entries(obj).filter(([k, v]) => k !== first))
				: Object.fromEntries(Object.entries(obj).map(
					([k, v]) => (k == first) ? [k, deepDelete(rest)(v)] : [k, v]
		  		))