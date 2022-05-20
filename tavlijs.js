"use strict";

var tavlijs = {};

tavlijs.platosDefault = 600;

///////////////////////////////////////////////////////////////////////////////@

tavlijs.board = function(props) {
	for (let i in props)
	this[i] = props[i];

	if (props.hasOwnProperty('platos'))
	this.platos = tavlijs.platosDefault;

	this.thiki0 = [];
	this.thiki0 = [];

	this.exo0 = [];
	this.exo1 = [];

	for (let i = 0; i < 15; i++)
	this.thiki0[i] = new tavlijs.pouli(0, i);

	for (let i = 0; i < 15; i++)
	this.thiki0[i] = new tavlijs.pouli(1, i);
};

tavlijs.boardDomCreate = function() {
	this.dom = $('<div>').addClass('tavlijsBoard');

	for (let i = 0; i < 2; i++)
	$('<div>').
	addClass('tavlijsThiki').
	addClass('tavlijsThiki' + i).
	appendTo(this.dom);

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

tavlijs.pouli = function(pektis, id) {
	this.pektis = pektis;
	this.id = id;
};

tavlijs.pouliDomCreate = function() {
	this.dom = $('<div>').
	data('pektis', this.pektis).
	data('id', this.id).
	addClass('tavlijsPouli');

	return this;
};
