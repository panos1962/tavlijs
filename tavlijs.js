"use strict";

var tavlijs = {};

tavlijs.platosDefault = 600;
tavlijs.ipsosAnalogia = 0.9;

tavlijs.thesiXroma = [
	'#D2B48C',
	'#CD853E'
];

///////////////////////////////////////////////////////////////////////////////@

tavlijs.tavli = function(props) {
	let i;

	if (props === undefined)
	props = {};

	if (!props.hasOwnProperty('platos'))
	props.platos = tavlijs.platosDefault;

	for (i in props)
	this[i] = props[i];

	this.thiki = [];

	for (i = 0; i < 2; i++) {
		this.thiki[i] = new tavlijs.thiki(i);

		for (let j = 0; j < 15; j++)
		this.thiki[i].plist.pouliPush(new tavlijs.pouli(i, j));
	}

	this.exo = [];

	for (i = 0; i < 2; i++)
	this.exo[i] = new tavlijs.exo(i);
};

tavlijs.tavli.prototype.domCreate = function() {
	this.dom = $('<div>').
	addClass('tavlijsTavli').
	css({
		"width": this.platos + 'px',
		"height": (this.platos * tavlijs.ipsosAnalogia) + 'px'
	});

	for (let i = 0; i < 2; i++)
	this.thiki[i].domGet().appendTo(this.dom);

	for (let i = 0; i < 2; i++)
	this.exo[i].domGet().appendTo(this.dom);

	for (let i = 0; i < 4; i++)
	(new tavlijs.perioxi(i)).domGet().appendTo(this.dom);

	for (let i = 0; i < 2; i++)
	(new tavlijs.zaria(i)).domGet().appendTo(this.dom);

	return this;
};

tavlijs.tavli.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

tavlijs.tavli.prototype.apikonisi = function() {
	$('.tavlijsThesi').each(function() {
		let id = $(this).data('id');

		let dom = $('<canvas>').
		addClass('tavlijsThesiTrigono').
		appendTo($(this));

		let w = dom.width();
		let h = dom.height();

		dom.
		attr({
			'width': w,
			'height': h
		});

		let ctx = dom[0].getContext('2d');

		ctx.beginPath();
		ctx.moveTo(0, h);
		ctx.lineTo(w / 2, h * 0.03);
		ctx.lineTo(w, h);
		ctx.closePath();

		ctx.fillStyle = tavlijs.thesiXroma[id % 2];
		ctx.fill();
	});

	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.perioxi = function(id) {
	this.id = id;
}

tavlijs.perioxi.prototype.domCreate = function() {
	let i;

	let perioxiDom = $('<div>').
	addClass('tavlijsPerioxi');

	for (i = 0; i < 6; i++)
	$('<div>').
	data('id', i).
	addClass('tavlijsThesi').
	appendTo(perioxiDom);

	this.dom = $('<div>').
	data('id', this.id).
	addClass('tavlijsPerioxiArea').
	addClass('tavlijsPerioxiArea' + this.id).
	append(perioxiDom);

	return this;
};

tavlijs.perioxi.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.zaria = function(pektis) {
	this.pektis = pektis;
}

tavlijs.zaria.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('id', this.pektis).
	addClass('tavlijsZariaArea').
	addClass('tavlijsZariaArea' + this.pektis).
	append($('<div>').
	addClass('tavlijsZaria'));

	return this;
};

tavlijs.zaria.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thiki = function(pektis) {
	this.pektis = pektis;
	this.plist = new tavlijs.dana();
};

tavlijs.thiki.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('tavlijsThiki').
	addClass('tavlijsThiki' + this.pektis);

	for (let i = 0; i < this.plist.length; i++)
	this.plist[i].domGet().appendTo(this.dom);

	return this;
};

tavlijs.thiki.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.exo = function(pektis) {
	this.pektis = pektis;
	this.plist = new tavlijs.dana();
};

tavlijs.exo.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('tavlijsExo').
	addClass('tavlijsExo' + this.pektis);

	for (let i = 0; i < this.plist.length; i++)
	this.plist[i].domGet().appendTo(this.dom);

	return this;
};

tavlijs.exo.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.dana = function() {
	this.plist = [];
}

tavlijs.dana.prototype.pouliPush = function(pouli) {
	this.plist.push(pouli);
	return this;
};

tavlijs.dana.prototype.pouliPop = function() {
	return this.plist.pop();
};

tavlijs.dana.prototype.domCreate = function() {
	this.dom = $('<div>').addClass('tavlijsDana');

	for (let i = 0; i < this.plist.length; i++)
	this.dom.prepend(this.plist[i].domGet());

	return this;
};

tavlijs.dana.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pouli = function(pektis, id) {
	this.pektis = pektis;
	this.id = id;
};

tavlijs.pouli.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	data('id', this.id).
	addClass('tavlijsPouli');

	return this;
};

tavlijs.pouli.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@
