"use strict";

tavlijs = {};

tavlijs.pexnidiPortes = 'ΠΟΡΤΕΣ';
tavlijs.pexnidiPlakoto = 'ΠΛΑΚΩΤΟ';
tavlijs.pexnidiFevga = 'ΦΕΥΓΑ';

///////////////////////////////////////////////////////////////////////////////@

tavlijs.partida = function() {
	this.id = undefined;
	this.stisimo = Date.now();
	this.pektis = {}
	this.enalagi = [
		tavlijs.pexnidiPortes,
		tavlijs.pexnidiPlakoto,
		tavlijs.pexnidiFevga,
	];
	this.staposa = 7;
	this.protos = undefined;
	this.enarxi = undefined;
	this.pexnidi = [];
	this.nikes[1] = 0;
	this.nikes[2] = 0;
	this.lixi = undefined;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pexnidi = function() {
	this.id = undefined;
	this.partida = undefined;
	this.idos = undefined;
	this.protos = undefined;
	this.enarxi = Date.now();
	this.kinisi = [];
	this.lixi = undefined;
	this.nikitis = undefined;
	this.pontoi = undefined;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.kinisi = function() {
	this.id = undefined
	this.pexnidi = undefined;
	this.pektis = undefined;
	this.idos = undefined;
	this.data = undefined;
};

///////////////////////////////////////////////////////////////////////////////@
