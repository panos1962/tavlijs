"use strict";

$(function() {
	let bodyDOM = $(document.body);
	let t1 = new tavlijs.tavli();

	t1.domCreate();
	t1.dom.appendTo(bodyDOM);
});
