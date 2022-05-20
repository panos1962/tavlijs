"use strict";

var tavlijs = {};

tavlijs.platosDefault = 600;

///////////////////////////////////////////////////////////////////////////////@

tavlijs.tavli = function(props) {
	if (props === undefined)
	props = {};

	for (let i in props)
	this[i] = props[i];

	if (!props.hasOwnProperty('platos'))
	this.platos = tavlijs.platosDefault;

	this.thiki = [];

	for (let pektis = 0; pektis < 2; pektis++)
	this.thiki[pektis] = new tavlijs.thiki(pektis);

	this.exo = [];

	for (let pektis = 0; pektis < 2; pektis++)
	this.exo[pektis] = new tavlijs.exo(pektis);

	for (let pektis = 0; pektis < 2; pektis++) {
		for (let i = 0; i < 15; i++)
		this.thiki[pektis][i] = new tavlijs.pouli(pektis, i);
	}
};

tavlijs.tavli.prototype.domCreate = function() {
	this.dom = $('<div>').
	addClass('tavlijsTavli').
	css({
		"width": this.platos + 'px',
		"height": (this.platos * 1.0) + 'px'
	});

	for (let i = 0; i < 2; i++)
	this.thiki[i].domGet().appendTo(this.dom);

	for (let i = 0; i < 2; i++)
	$('<div>').
	addClass('tavlijsExo').
	addClass('tavlijsExo' + i).
	appendTo(this.dom);

	for (let i = 0; i < 4; i++)
	$('<div>').
	addClass('tavlijsPerioxi').
	addClass('tavlijsPerioxi' + i).
	appendTo(this.dom);

	for (let i = 0; i < 2; i++)
	$('<div>').
	addClass('tavlijsZaria').
	addClass('tavlijsZaria' + i).
	appendTo(this.dom);

	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thiki = function(pektis) {
	this.pektis = pektis;
	this.plist = [];

	for (let i = 0; i < 15; i++)
	this.plist[i] = new tavlijs.pouli(pektis, i);
};

tavlijs.thiki.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('thiki').
	addClass('thiki' + this.pektis);

	for (let i = 0; i < 15; i++)
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
	this.plist = [];
};

tavlijs.exo.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('exo').
	addClass('exo' + this.pektis);

	for (let i = 0; i < 15; i++)
	this.plist[i].domGet().appendTo(this.dom);

	return this;
};

tavlijs.thiki.prototype.domGet = function() {
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
