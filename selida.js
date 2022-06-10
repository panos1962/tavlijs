"use strict";

$(function() {
	tavlijs.pektis = 0;
	let arenaDom = $('<div>').appendTo($(document.body));
	let t;
tavlijs.init(arenaDom);

	[
		/*
		70,
		100,
		200,
		300,
		400,
		450,
		500,
		700,
		2000,
		3000,
		*/
800,
800,
3000,
	].forEach(function(w, i) {
		t = new tavlijs.tavli();
		t.platosSet(w);

		switch (i % 3) {
		case 0:
			t.portesSet();
			break;
		case 1:
			t.plakotoSet();
			break;
		case 2:
			t.fevgaSet();
			break;
		}

		t.epomenosSet(i % 2);
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

		t.dom().appendTo(arenaDom);
	});
});
