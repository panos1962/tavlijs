"use strict";

var tavlijs = {};

// Κάθε ταμπλό έχει ένα συνολικό πλάτος στο οποίο, εκτός από το κυρίως ταμπλό
// που παίζεται το παιχνίδι, περιλαμβάνονται και οι πλαϊνές ντάνες (αριστερά
// τα μαζεμένα πούλια και δεξιά τα χτυπημένα πούλια). Το συνολικό πλάτος του
// ταμπλό μετριέται σε pixel αποτελεί property του ταμπλό. Αν δεν καθοριστεί
// παίρνει τιμή που καθορίζουμε εδώ με τη σταθερά "platosDefault".

tavlijs.platosDefault = 100;

// Το συνολικό ύψος του ταμπλό προκύπτει κατ' αναλογία από το πλάτος. Με άλλα
// λόγια η αναλογία ύψους/πλάτους είναι σταθερή και καθορίζεται από την τιμή
// της σταθεράς "ipsosAnalogia".

tavlijs.ipsosAnalogia = 0.9;

// Ακολουθούν τα χρώματα που παίρνουν εναλλάξ οι θέσεις στο ταμπλό. Θυμίζουμε
// ότι οι 24 θέσεις αριθμούνται από 0 έως 23, εκκινούν από τη θέση 0 κάτω
// αριστερά και καταλήγουν στη θέση 23 επάνω αριστερά, ακολουθώντας κυκλική
// τροχιά με φορά αντίστροφη από αυτήν των δεικτών του ωρολογίου.

tavlijs.thesiXroma = [
	'#D2B48C',	// 0, 2, 4,... 22
	'#CD853E'	// 1, 3, 5,... 23
];

tavlijs.pouliPlatosAnalogia = 0.068;
tavlijs.pouliIpsosAnalogia = 0.38;

tavlijs.pouliMesaXroma = [
	'#F5F5DC',
	'#1D3025'
];

tavlijs.pouliPerigramaXroma = [
	'#003C00',
	'#325D1E'
];

///////////////////////////////////////////////////////////////////////////////@

// Ακολουθούν οι προδιαγραφές που καθορίζουν τα αντικείμενα τύπου "tavli" που
// περιλαμβάνουν τις πλαϊνές ντάνες, το ταμπλό αυτό καθαυτό, τις 24 θέσεις του
// ταμπλό και τα πούλια.

tavlijs.tavli = function(props) {
	let i;

	if (props === undefined)
	props = {};

	for (i in props)
	this[i] = props[i];

	if (!this.hasOwnProperty('platos'))
	props['platos'] = tavlijs.platosDefault;

	// Ως «θήκες» ορίζουμε τις ντάνες που βρίσκονται έξω από το ταμπλό,
	// στην αριστερά πλευρά. Πρόκειται για δύο ντάνες όπου στην κάτω
	// ντάνα τοποθετούνται τα πούλια του παίκτη 0 και στην πάνω ντάνα
	// τοποθετούνται τα πούλια του παίκτη 1. Στις θήκες τοποθετούνται
	// αρχικά τα 15 πούλια, πριν αρχίσει οποιοδήποτε παιχνίδι, ενώ τα
	// πούλια επανατοποθετούνται στις θήκες στη φάση του μαζέματος. Οι
	// δύο θήκες ορίζονται ως ένα array δύο θέσεων με τη θήκη 0 να
	// αφορά τα πούλια του παίκτη 0, και τη θήκη 1 να αφορά τα πούλια
	// του παίκτη 1.

	if (!this.hasOwnProperty('thiki'))
	this.thiki = [];

	for (i = 0; i < 2; i++)
	this.thiki[i] = new tavlijs.thiki(this, i);

	// Ως «έξω» ορίζουμε τις ντάνες που βρίσκονται έω από το ταμπλό, στη
	// δεξιά πλευρά, και αφορούν στα χτυπημένα πούλια που παρουσιάζονται
	// στο παιχνίδι «πόρτες». Κατά τα λοιπά οι «έξω» ντάνες μοιάζουν με
	// τις «θήκες» όσον αφορά τη χωροταξία: κάτω αριστερά τοποθετουνται
	// τα χτυπημένα πούλια του παίκτη 0, ενώ επάνω αριστερά τοποθετούνται
	// τα χτυπημένα πούλια του παίκτη 1.

	if (!this.hasOwnProperty('exo'))
	this.exo = [];

	for (i = 0; i < 2; i++)
	this.exo[i] = new tavlijs.exo(this, i);

	// Ακολουθεί το array 24 θέσεων, που περιλαμβάνει όλες τις θέσεις
	// στις οποίες μπορούν να τοποθετηθούν πούλια μέσα στο ταμπλό.

	if (!this.hasOwnProperty('thesi'))
	this.thesi = [];

	for (i = 0; i < 24; i++)
	this.thesi[i] = new tavlijs.thesi(i);
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

	let misoDom = [];

	for (let i = 0; i < 2; i++)
	$('<div>').
	addClass('tavlijsMisoArea').
	addClass('tavlijsMisoArea' + i).
	append(misoDom[i] = $('<div>').
	addClass('tavlijsMiso')).
	appendTo(this.dom);

	(new tavlijs.perioxi(this, 0)).domGet().appendTo(misoDom[0]);
	(new tavlijs.perioxi(this, 1)).domGet().appendTo(misoDom[1]);
	(new tavlijs.perioxi(this, 2)).domGet().appendTo(misoDom[1]);
	(new tavlijs.perioxi(this, 3)).domGet().appendTo(misoDom[0]);

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
	let tavli = this;
	let dom = this.domGet();

	dom.find('.tavlijsThesi').each(function() {
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

/*
	dom.find('.tavlijsPouliDana').each(function() {
		let w = $(this).width();
		let css = {
			'height': w * 0.2,
			'border-width': w * 0.07,
			'border-radius': w * 0.1,
			'margin-top': w * 0.05,
		};

		if (tavli.platos < 400) {
			css['margin-top'] = 0;
		}

		if (tavli.platos < 200) {
			css['border-width'] *= 0.5;
			css['border-radius'] = 0;
			css['height'] *= 0.8;
		}

		if (tavli.platos < 100) {
			css['height'] = 0.0001;
			css['border-width'] = 0.00001;
		}

		for (let i in css)
		css[i] = css[i] + 'px';

		$(this).css(css);
	});
*/

	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.perioxi = function(tavli, id) {
	this.tavli = tavli;
	this.id = id;
}

tavlijs.perioxi.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('id', this.id).
	addClass('tavlijsPerioxi').
	addClass('tavlijsPerioxi' + this.id);

	let id = this.id * 6;

	for (let i = 0; i < 6; i++, id++)
	this.tavli.thesi[id].domGet().appendTo(this.dom);

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
	addClass('tavlijsZaria').
	addClass('tavlijsZaria' + this.pektis);

	return this;
};

tavlijs.zaria.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thiki = function(tavli, pektis) {
	this.tavli = tavli;
	this.pektis = pektis;
	this.dana = new tavlijs.dana();
};

tavlijs.thiki.prototype.pouliWalk = function(callback) {
	this.dana.plist.forEach(callback);
	return this;
};

tavlijs.thiki.prototype.pouliPush = function(pouli) {
	this.dana.pouliPush(pouli);

	return this;
};

tavlijs.thiki.prototype.domCreate = function() {
	let thiki = this;

	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('tavlijsThiki').
	addClass('tavlijsThiki' + this.pektis);

	this.pouliWalk(function(pouli) {
		pouli.domDanaGet().appendTo(thiki.dom);
	});

	return this;
};

tavlijs.thiki.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.exo = function(tavli, pektis) {
	this.tavli = tavli;
	this.pektis = pektis;
	this.dana = new tavlijs.dana();
};

tavlijs.exo.prototype.pouliPush = function(pouli) {
	this.dana.pouliPush(pouli);

	return this;
};

tavlijs.exo.prototype.pouliWalk = function(callback) {
	this.dana.plist.forEach(callback);
	return this;
};

tavlijs.exo.prototype.domCreate = function() {
	let exo = this;

	this.dom = $('<div>').
	data('pektis', this.pektis).
	addClass('tavlijsExo').
	addClass('tavlijsExo' + this.pektis);

	this.pouliWalk(function(pouli) {
		pouli.domDanaGet().appendTo(exo.dom);
	});

	return this;
};

tavlijs.exo.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thesi = function(id) {
	this.id = id;
	this.dana = new tavlijs.dana();
};

tavlijs.thesi.prototype.pouliWalk = function(callback) {
	this.dana.plist.forEach(callback);
	return this;
};

tavlijs.thesi.prototype.pouliPush = function(pouli) {
	this.dana.pouliPush(pouli);

	return this;
};

tavlijs.thesi.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('id', this.id).
	addClass('tavlijsThesi');

	return this;
};

tavlijs.thesi.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.dana = function() {
	this.plist = [];
}

tavlijs.dana.prototype.countGet = function() {
	return this.plist.length;
};

tavlijs.dana.prototype.pouliGet = function(i) {
	return this.plist[i];
};

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

tavlijs.pouli = function(tavli, pektis, id) {
	this.tavli = tavli;
	this.pektis = pektis;
	this.id = id;
};

tavlijs.pouli.prototype.domCreate = function() {
	let w = this.tavli.platos * tavlijs.pouliPlatosAnalogia;
	let h = w * tavlijs.pouliIpsosAnalogia;

	let canvasDom = $('<canvas>').
	attr({
		'width': w,
		'height': h
	});

	let ctx = canvasDom[0].getContext('2d');

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(w, 0);
	ctx.lineTo(w, h);
	ctx.closePath();

	ctx.fillStyle = tavlijs.pouliMesaXroma[this.pektis];
	ctx.fill();

	this.dom = $('<div>').
	data('tavli', this.tavli).
	data('pektis', this.pektis).
	data('id', this.id).
	addClass('tavlijsPouli').
	addClass('tavlijsPouli' + this.pektis).
	append(canvasDom);

	canvasDom = $('<canvas>').
	attr({
		'width': w,
		'height': h
	});

	let r = h * 0.1;
	let dh = h * 0.05;
	let dw = w * 0.03;
	let lw = h * 0.15;

	ctx = canvasDom[0].getContext('2d');

	ctx.beginPath();
	ctx.moveTo(r + dw + lw, dh + lw);
	ctx.lineTo(w - r - dw - lw, dh + lw);
	ctx.quadraticCurveTo(w - dw - lw, dh + lw, w - dw - lw, dh + r + lw);
	ctx.lineTo(w - dw - lw, h - dh - r - lw);
	ctx.quadraticCurveTo(w - dw - lw, h - dh - lw, w - r - dw - lw, h - dh - lw);
	ctx.lineTo(r + dw + lw, h - dh - lw);
	ctx.quadraticCurveTo(dw + lw, h - dh - lw, dw + lw, h - r - dh - lw);
	ctx.lineTo(dw + lw, dh + r + lw);
	ctx.quadraticCurveTo(dw + lw, dh + lw, r + dw + lw, dh + lw);
	ctx.closePath();

	ctx.lineWidth = lw * 2;
	ctx.strokeStyle = tavlijs.pouliPerigramaXroma[this.pektis];
	ctx.stroke();

	ctx.fillStyle = tavlijs.pouliMesaXroma[this.pektis];
	ctx.fill();

	this.domDana = $('<div>').
	data('tavli', this.tavli).
	data('pektis', this.pektis).
	data('id', this.id).
	addClass('tavlijsPouliDana').
	addClass('tavlijsPouliDana' + this.pektis).
	append(canvasDom);

	return this;
};

tavlijs.pouli.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

tavlijs.pouli.prototype.domDanaGet = function() {
	if (!this.hasOwnProperty('domDana'))
	this.domCreate();

	let dom = this.domDana;

	dom.
	removeClass().
	addClass('tavlijsPouliDana').
	addClass('tavlijsPouliDana' + this.pektis);

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@
