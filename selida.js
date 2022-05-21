"use strict";

$(function() {
	let bodyDOM = $(document.body);
	let t;

	[
		70,
		100,
		200,
		300,
		400,
		450,
		500,
		700,
	].forEach(function(w) {
		t = new tavlijs.tavli({'platos': w});

for (let i = 0; i < 15; i++)
t.thiki[0].pouliPush(new tavlijs.pouli(0, i));

for (let i = 0; i < 15; i++)
t.thiki[1].pouliPush(new tavlijs.pouli(1, i));

for (let i = 0; i < 5; i++)
t.exo[0].pouliPush(new tavlijs.pouli(0, i));

for (let i = 0; i < 5; i++)
t.exo[1].pouliPush(new tavlijs.pouli(1, i));

for (let i = 0; i < 5; i++)
t.thesi[0].pouliPush(new tavlijs.pouli(0, i));

		t.domGet().appendTo(bodyDOM);
		t.apikonisi();
	});
});
