"use strict";

// Πρόκειται για τον βασικό πυρήνα της βιβλιοθήκης "tavlijs", που εντάσσεται
// ως global αντικείμενο είτε στον client (browser), είτε στον server (node).
// Για το αν βρισκόμαστε στον client ή στον server «αποφαίνονται» οι global
// μεταβλητές "window" και "global". Πράγματι, στον client (browser) υπάρχει
// το global αντικείμενο "window" στο οποίο εντάσσονται όλα τα υπόλοιπα global
// αντικείμενα, ενώ αντίστοιχα στον server (node) όλα τα global αντικέιμενα
// εντάσσονται στο μοναδικό πραγματικά global αντικείμενο που ονομάζεται
// "global".

try {
	window.tavlijs = {};
} catch (e) {
	global.tavlijs = {};
}

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
