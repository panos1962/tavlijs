"use strict";

$(function() {
	let bodyDOM = $(document.body);
	let t;

	[
		70,
		/*
		100,
		200,
		300,
		*/
		400,
		/*
		450,
		500,
		*/
		700,
		/*
		2000,
		*/
		3000,
	].forEach(function(w) {
		t = new tavlijs.tavli({'platos': w});

		t.piosSet(Math.floor(Math.random() * 2));
		t.zariaSet();

		if (t.zariGet(0) === t.zariGet(1))
		t.pexiaCount = Math.floor(Math.random() * 5);

		else
		t.pexiaCount = Math.floor(Math.random() * 3);

for (let i = 0; i < 15; i++)
t.thiki[0].pouliPush(new tavlijs.pouli(t, 0, i));

for (let i = 0; i < 15; i++)
t.thiki[1].pouliPush(new tavlijs.pouli(t, 1, i));

for (let i = 0; i < 5; i++)
t.exo[0].pouliPush(new tavlijs.pouli(t, 0, i));

for (let i = 0; i < 5; i++)
t.exo[1].pouliPush(new tavlijs.pouli(t, 1, i));

t.thesi[0].pouliPush(new tavlijs.pouli(t, 1, 0));
for (let i = 1; i < 4; i++)
t.thesi[0].pouliPush(new tavlijs.pouli(t, 0, i));

t.thesi[1].pouliPush(new tavlijs.pouli(t, 0, 0));
for (let i = 1; i < 8; i++)
t.thesi[1].pouliPush(new tavlijs.pouli(t, 1, i));

for (let i = 2; i < 6; i++)
t.thesi[i].pouliPush(new tavlijs.pouli(t, i % 2, 0));

let n = 1;
for (let i = 6; i < 21; i++) {
	for (let j = 0; j < i - 5; j++)
	t.thesi[i].pouliPush(new tavlijs.pouli(t, i % 2, i));

}

		t.domGet().appendTo(bodyDOM);
	});
});
