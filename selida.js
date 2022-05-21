"use strict";

$(function() {
	let bodyDOM = $(document.body);
	let t1 = new tavlijs.tavli();

	t1.domGet().appendTo(bodyDOM);
	t1.apikonisi();
});
