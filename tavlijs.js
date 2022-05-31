"use strict";

var tavlijs = {};

tavlijs.platosDefault = 600;

///////////////////////////////////////////////////////////////////////////////@

// Κάθε τάβλι έχει ένα συνολικό πλάτος στο οποίο, εκτός από το κυρίως ταμπλό
// όπου παίζεται το παιχνίδι, περιλαμβάνονται και οι πλαϊνές ντάνες (αριστερά
// τα μαζεμένα πούλια και δεξιά τα χτυπημένα πούλια). Το κάτω μέρος αφορά στον
// παίκτη 0, ενώ το επάνω μέρος αφορά στον παίκτη 1. Περιλαμβάνονται ακόμη τα
// ζάρια και το πλήθος των παιξιών που έχουν παιχτεί και αφορούν σε κάθε
// συγκεκριμένη ζαριά.

tavlijs.platosDefault = 100;

tavlijs.tavli = function() {
	let i;

	// Το συνολικό πλάτος τού ταμπλό μετριέται σε pixels, και  αποτελεί
	// property του ταμπλό.

	this.platos = tavlijs.platosDefault;

	// Ως «θήκες» ορίζουμε τις ντάνες που βρίσκονται έξω από το ταμπλό,
	// στην αριστερά πλευρά. Πρόκειται για δύο ντάνες όπου στην κάτω
	// ντάνα τοποθετούνται τα πούλια του παίκτη 0 και στην πάνω ντάνα
	// τοποθετούνται τα πούλια του παίκτη 1. Στις θήκες τοποθετούνται
	// αρχικά τα 15 πούλια, πριν αρχίσει οποιοδήποτε παιχνίδι, ενώ τα
	// πούλια επανατοποθετούνται στις θήκες στη φάση του μαζέματος. Οι
	// δύο θήκες ορίζονται ως ένα array δύο θέσεων με τη θήκη 0 να
	// αφορά τα πούλια του παίκτη 0, και τη θήκη 1 να αφορά τα πούλια
	// του παίκτη 1.

	this.thiki = [];

	for (i = 0; i < 2; i++)
	this.thiki[i] = new tavlijs.thiki(this, i);

	// Ως «έξω» ορίζουμε τις ντάνες που βρίσκονται έξω από το ταμπλό, στη
	// δεξιά πλευρά, και αφορούν στα χτυπημένα πούλια που παρουσιάζονται
	// στο παιχνίδι «πόρτες». Κατά τα λοιπά οι «έξω» ντάνες μοιάζουν με
	// τις «θήκες» όσον αφορά τη χωροταξία: κάτω αριστερά τοποθετουνται
	// τα χτυπημένα πούλια του παίκτη 0, ενώ επάνω αριστερά τοποθετούνται
	// τα χτυπημένα πούλια του παίκτη 1.

	this.exo = [];

	for (i = 0; i < 2; i++)
	this.exo[i] = new tavlijs.exo(this, i);

	// Ακολουθεί το array 24 θέσεων, που περιλαμβάνει όλες τις θέσεις
	// στις οποίες μπορούν να τοποθετηθούν πούλια μέσα στο ταμπλό. Οι
	// θήκες αριθμούνται από 0 έως 23, ξεκινώντας από τη θέση κάτω
	// αρστερά και καταλήγοντας στη θέση επάνω αριστερά ακολουθώντας
	// κυκλική πορεία με φορά αντίστροφη των δεικτών του ρολογιού.

	this.thesi = [];

	for (i = 0; i < 24; i++)
	this.thesi[i] = new tavlijs.thesi(this, i);

	// Το property "zari" είναι ένα array δύο θέσεων και περιέχει τα
	// δύο ζάρια.

	if (!this.hasOwnProperty('zari'))
	this.zari = [];

	// Το property "pexiaCount" δείχνει πόσες από τις παιξιές που
	// καθορίζουν τα δύο ζάρια έχουν παιχτεί. Η τιμή του "pexiaCount"
	// κυμαίνεται από 0 έως 2, ενώ για τις διπλές παίρνει και τις τιμές
	// 3 και 4.

	if (!this.hasOwnProperty('pexia'))
	this.pexia = 0;

	// Το property "epomenos" δείχνει ποιος παίκτης έχει σειρά να κάνει
	// την (όποια) επόμενη κίνηση. Επομένως, οι τιμές που μπορεί να πάρει
	// το property "epomenos" είναι 0, 1 και undefined.

	if (!this.hasOwnProperty('epomenos'))
	this.epomenos = undefined;

	if (!this.hasOwnProperty('kinisi'))
	this.kinisi = [];
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.tavli.prototype.platosSet = function(platos) {
	if (platos === undefined)
	this.platos = tavlijs.platosDefault;

	else
	this.platos = platos;

	return this;
};

tavlijs.tavli.prototype.platosGet = function() {
	return this.platos;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.tavli.prototype.epomenosSet = function(pektis) {
	if (pektis === undefined)
	delete this.epomenos;

	else
	this.epomenos = pektis;

	return this;
};

tavlijs.tavli.prototype.epomenosGet = function() {
	return this.epomenos;
};

tavlijs.tavli.prototype.zariaSet = function(zari1, zari2) {
	if (zari1 === undefined)
	zari1 = new tavlijs.zari().tixiSet();

	else if (!(zari1 instanceof tavlijs.zari))
	zari1 = new tavlijs.zari(zari1);

	if (zari2 === undefined)
	zari2 = new tavlijs.zari().tixiSet();

	else if (!(zari2 instanceof tavlijs.zari))
	zari2 = new tavlijs.zari(zari2);

	this.zari = [
		zari1,
		zari2,
	];

	return this;
};

tavlijs.tavli.prototype.zariGet = function(n) {
	return this.zari[n].face;
};

tavlijs.tavli.prototype.dom = function() {
	let dom;
	let i;

	// Η συνολική εικόνα περιλαμβάνει τις «θήκες» (αριστερά), το κυρίως
	// ταμπλό (κέντρο) και τα «έξω» (δεξιά).

	dom = $('<div>').
	data('tavli', this).
	addClass('tavlijsTavli').
	css({
		"width": this.platos + 'px',
		"height": (this.platos * 0.9) + 'px'
	});

	// Εκκινούμε με τις «θήκες» στην αριστερή πλευρά.

	for (i = 0; i < 2; i++)
	this.thiki[i].dom().appendTo(dom);

	// Συνεχίζουμε με τα «έξω» στη δεξιά πελυρά.

	for (i = 0; i < 2; i++)
	this.exo[i].dom().appendTo(dom);

	// Ακολουθεί το κυρίως ταμπλό στο κέντρο. Το ταμπλό αποτελείται από
	// δύο μέρη, όπως το πραγματικό ταμπλό.

	let misoDom = [];

	// Θα χρησιμποιήσουμε λίγη σκιά στην αριστερή και κάτω πλευρά τού
	// ταμπλό. Υπολογίζουμε το πλάτος της σκιάς.

	let ws = this.platos * 0.003;

	// Το κάθε μισό του ταμπλό αποτελείται από ένα μεγάλο ορθογώνιο και
	// ένα μικρότερο που περιέχεται στο μεγάλο με σκοπό να δημιουργηθεί
	// το περίγραμμα του ταμπλό.

	for (i = 0; i < 2; i++)
	$('<div>').
	addClass('tavlijsMisoArea tavlijsMisoArea' + i).
	css('box-shadow', ws + 'px ' + ws + 'px ' + (2 * ws) + 'px #4e4629').
	append(misoDom[i] = $('<div>').
	addClass('tavlijsMiso')).
	appendTo(dom);

	// Σε κάθε μισό εντάσσουμε μια «περιοχή» όπου κάθε περιοχή περιέχει
	// έξι θέσεις στις οποίες τοποθετούνται τα πούλια καθώς παίζεται το
	// παιχνίδι. Οι περιοχές αριθμούνται από 0 έως 3 ξεκινώντας από την
	// περιοχή κάτω αριστερά και καταλήγοντας επάνω αριστερά ακολουθώντας
	// κυκλική τροχία με φορά αντίστροφή από αυτήν των δεικων του ρολογιού.

	(new tavlijs.perioxi(this, 0)).dom().appendTo(misoDom[0]);
	(new tavlijs.perioxi(this, 1)).dom().appendTo(misoDom[1]);
	(new tavlijs.perioxi(this, 2)).dom().appendTo(misoDom[1]);
	(new tavlijs.perioxi(this, 3)).dom().appendTo(misoDom[0]);

	// Ακολουθούν δύο περιοχές στις οποίες τοποθετούνται τα ζάρια.
	// Πρόκειται για δύο οζιζόντιες λωρίδες που βρίσκονται ανάμεσα
	// από την κάτω και την επάνω περιοχή καθενός από τα δύο μισά
	// του ταμπλό.

	let zariaDom = [];

	for (i = 0; i < 2; i++)
	zariaDom[i] = (new tavlijs.zaria(i)).dom().
	appendTo(misoDom[i ? 0 : 1]);

	let zariDom = [];
	let zw = this.platos * 0.050;
	let zm = zw * 0.08;
	let zb = zw * 0.14;

	for (i = 0; i < this.zari.length; i++)
	zariDom[i] = this.zari[i].dom().
	css({
		'width': zw + 'px',
		'height': zw + 'px',
		'border-width': zb + 'px',
		'margin-left': zm + 'px',
		'margin-right': zm + 'px',
	}).
	appendTo(zariaDom[this.epomenos]);

	if (this.zari.length === 2) {
		if (this.zari[0].face !== this.zari[1].face) {
			if (this.pexiaCount > 1)
			zariDom[1].addClass('tavlijsZariLeft').addClass('tavlijsZariRight');

			if (this.pexiaCount > 0)
			zariDom[0].addClass('tavlijsZariLeft').addClass('tavlijsZariRight');
		}

		else {
			if (this.pexiaCount > 3)
			zariDom[1].addClass('tavlijsZariLeft').addClass('tavlijsZariRight');

			if (this.pexiaCount > 2)
			zariDom[1].addClass('tavlijsZariLeft');

			if (this.pexiaCount > 1)
			zariDom[0].addClass('tavlijsZariLeft').addClass('tavlijsZariRight');

			if (this.pexiaCount > 0)
			zariDom[0].addClass('tavlijsZariLeft');
		}
	}

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.perioxi = function(tavli, id) {
	this.tavli = tavli;
	this.id = id;
}

tavlijs.perioxi.prototype.dom = function() {
	let dom = $('<div>').
	data('perioxi', this).
	addClass('tavlijsPerioxi').
	addClass('tavlijsPerioxi' + this.id);

	let id = this.id * 6;

	for (let i = 0; i < 6; i++, id++)
	this.tavli.thesi[id].dom().appendTo(dom);

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.zaria = function(tavli, pektis) {
	this.tavli = tavli;
	this.pektis = pektis;
}

tavlijs.zaria.prototype.dom = function() {
	let dom = $('<div>').
	data('zaria', this).
	addClass('tavlijsZaria');

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thiki = function(tavli, pektis) {
	this.tavli = tavli;
	this.pektis = pektis;
	this.dana = new tavlijs.dana();
};

tavlijs.thiki.prototype.pouliWalk = function(callback) {
	this.dana.pouliWalk(callback);
	return this;
};

tavlijs.thiki.prototype.pouliPush = function(pouli) {
	this.dana.pouliPush(pouli);
	return this;
};

tavlijs.thiki.prototype.dom = function() {
	let dom = $('<div>').
	data('stili', this).
	addClass('tavlijsThiki').
	addClass('tavlijsThiki' + this.pektis);

	this.pouliWalk(function(pouli) {
		pouli.plakaDom().appendTo(dom);
	});

	return dom;
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
	this.dana.pouliWalk(callback);
	return this;
};

tavlijs.exo.prototype.dom = function() {
	let dom = $('<div>').
	data('stili', this).
	addClass('tavlijsExo').
	addClass('tavlijsExo' + this.pektis);

	this.pouliWalk(function(pouli) {
		pouli.plakaDom().appendTo(dom);
	});

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.thesi = function(tavli, id) {
	this.tavli = tavli;
	this.id = id;
	this.dana = new tavlijs.dana();
};

tavlijs.thesi.prototype.pouliWalk = function(callback) {
	this.dana.pouliWalk(callback);
	return this;
};

tavlijs.thesi.prototype.pouliPush = function(pouli) {
	this.dana.pouliPush(pouli);

	return this;
};

tavlijs.thesi.prototype.dom = function() {
	let dom = $('<div>').
	data('stili', this).
	addClass('tavlijsThesi').
	css('width', (this.tavli.platos * 0.0640) + 'px');

	let w = this.tavli.platos * 0.0625;
	let h = this.tavli.platos * 0.3975;

	$('<svg width="' + w + '" height="' + h + '">' +
	'<polygon class="tavlijsThesiTrigono' + (this.id % 2) + '" ' +
	'points="0,' + h + ' ' + (w / 2) + ',0' + ' ' + w + ',' + h + '"/>').
	appendTo(dom);

	let b = this.tavli.platos * 0.0005;
	let dh1 = this.tavli.platos * 0.0635;

	let orio = 15;
	let dh2 = dh1;
	let count = this.dana.countGet();

	if (count > 15) { dh2 = dh1 / 6; orio = 3; }
	else if (count > 13) { dh2 = dh1 / 3.72; orio = 2; }
	else if (count > 12) { dh2 = dh1 / 3.3; orio = 2; }
	else if (count > 10) { dh2 = dh1 / 2.82; orio = 2; }
	else if (count > 9) { dh2 = dh1 / 2.2; orio = 2; }
	else if (count > 8) { dh2 = dh1 / 2.0; orio = 2; }
	else if (count > 7) { dh2 = dh1 / 1.9; orio = 3; }
	else if (count > 6) { dh2 = dh1 / 2.15; orio = 4; }

	let n = 0;
	this.pouliWalk(function(pouli) {
		pouli.kermaDom().css('bottom', b + 'px').appendTo(dom);
		n++;
		b += (n > orio ? dh2 : dh1)
	});

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.dana = function() {
	this.plist = [];
}

tavlijs.dana.prototype.countGet = function() {
	return this.plist.length;
};

tavlijs.dana.prototype.pouliGet = function(n) {
	let max = this.countGet() - 1;

	if (n === undefined)
	n = max;

	if ((n < 0) || (n > max))
	return undefined;

	return this.plist[n];
};

tavlijs.dana.prototype.pouliPush = function(pouli) {
	this.plist.push(pouli);
	return this;
};

tavlijs.dana.prototype.pouliPop = function() {
	return this.plist.pop();
};

tavlijs.dana.prototype.pouliWalk = function(callback) {
	this.plist.forEach(callback);

	return this;
};

tavlijs.dana.prototype.domCreate = function() {
	this.dom = $('<div>').
	data('dana', this).
	addClass('tavlijsDana');

	for (let i = 0; i < this.plist.length; i++)
	this.dom.prepend(this.plist[i].domGet());

	return this;
};

tavlijs.dana.prototype.domGet = function() {
	if (!this.hasOwnProperty('dom'))
	this.domCreate();

	return this.dom;
};

tavlijs.dana.prototype.candiPush = function(candi) {
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pouli = function(tavli, pektis) {
	this.tavli = tavli;

	if (pektis !== undefined)
	this.pektis = pektis;
};

tavlijs.pouli.prototype.kermaDom = function() {
	let w = this.tavli.platos * 0.064;
	let r = w / 2;
	let rexo = r * 0.985;
	let rmesi = r * 0.96;
	let reso = r * 0.85;

	let svgDom = $('<svg width="' + w + '" height="' + w + '">' +
	'<circle class="tavlijsPouliKermaExo' + this.pektis + '" ' +
	'cx="' + r + '" cy="' + r + '" ' + 'r="' + rexo + '" />' +
	'<circle class="tavlijsPouliKermaMesi' + this.pektis + '" ' +
	'cx="' + r + '" cy="' + r + '" ' + 'r="' + rmesi + '" />' +
	'<circle class="tavlijsPouliKermaEso' + this.pektis + '" ' +
	'cx="' + r + '" cy="' + r + '" ' + 'r="' + reso + '" />');

	let dom = $('<div>').
	data('pouli', this).
	addClass('tavlijsPouliKerma').
	append(svgDom);

	this.candiDom = $(svgDom.children().get(1));

	return dom;
};

tavlijs.pouli.prototype.plakaDom = function() {
	let w = this.tavli.platos * 0.062;
	let h = w * 0.32;

	let wexo = w * 0.99;
	let hexo = h * 0.9;

	let weso = wexo * 0.93;
	let heso = hexo * 0.75;

	let dw = (wexo - weso) / 2;
	let dh = (hexo - heso) / 2;

	let rexo = hexo * 0.2;
	let reso = heso * 0.10;

	let svgDom = $('<svg width="' + w + '" height="' + h + '">' +
	'<rect class="tavlijsPouliPlakaExo' + this.pektis + '" ' +
	'x="0" y="0" rx="' + rexo + '" ry="' + rexo + '" ' +
	'width="' + wexo + '" height="' + hexo + '" />' +
	'<rect class="tavlijsPouliPlakaEso' + this.pektis + '" ' +
	'x="' + dw + '" y="' + dh + '" ' +
	'rx="' + reso + '" ry="' + reso + '" ' +
	'width="' + weso + '" height="' + heso + '" />');

	let dom = $('<div>').
	data('pouli', this.tavli).
	addClass('tavlijsPouliPlaka').
	append(svgDom);

	this.candiDom = $(svgDom.children().get(1));

	return dom;
};

tavlijs.pouli.prototype.candiKermaDom = function() {
	if (!this.hasOwnProperty('candiDom'))
	this.domCreate();

	return this.candiDom;
};

tavlijs.pouli.prototype.candiPlakaDom = function() {
	if (!this.hasOwnProperty('candiDanaDom'))
	this.domCreate();

	return this.candiDanaDom;
};

tavlijs.pouli.prototype.candiSet = function() {
	let candiClass = 'tavlijsPouliCandi' + this.pektis;

	this.candiDomGet().addClass(candiClass);
	this.candiDanaDomGet().addClass(candiClass);

	return this;
};

tavlijs.pouli.prototype.candiUnset = function() {
	let candiClass = 'tavlijsPouliCandi' + this.pektis;

	this.candiDomGet().removeClass(candiClass);
	this.candiDanaDomGet().removeClass(candiClass);

	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.zari = function(face) {
	this.face = face;
};

tavlijs.zari.prototype.tixiSet = function() {
	this.face = Math.floor(Math.random() * 6) + 1;
	return this;
};

tavlijs.zari.prototype.dom = function() {
	let dom = $('<img>').
	data('zari', this).
	addClass('tavlijsZari').
	attr('src', 'ikona/' + this.face + '.png').
	addClass('tavlijsZari');

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.candi = {};

tavlijs.candiClear = function(e) {
	if (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	let dt = Date.now() - tavlijs.candiSetTimestamp;

	if (dt < 200)
	return;

	tavlijs.candiSetTimestamp = 0;

	if (tavlijs.candi.pouli)
	tavlijs.candi.pouli.candiUnset();

	if (tavlijs.candi.marka)
	tavlijs.candi.marka.domGet().remove();

	tavlijs.candi = {};
};

tavlijs.candiSet = function(e, what) {
	let x = e.pageX;
	let y = e.pageY;

	tavlijs.candiClear();

	if (typeof(what) !== 'object')
	return tavlijs;

	let pouli = undefined;

	if ((what instanceof tavlijs.thesi) ||
		(what instanceof tavlijs.thiki) ||
		(what instanceof tavlijs.exo))
	pouli = what.dana.pouliGet();

	if (!pouli)
	return tavlijs;

	// Αν ξανακάνουμε κλικ στο ίδιο πούλι, ακυρώνουμε την προηγούμενη
	// επιλογή μας.

	if (pouli === tavlijs.candi.pouli)
	return tavlijs;

	let tavli = what.tavli;

	tavlijs.candi.pouli = pouli.candiSet();
	tavlijs.candi.marka = new tavlijs.pouli(pouli.tavli, pouli.pektis);
	tavlijs.candi.markaX0 = x;
	tavlijs.candi.markaY0 = y;

	let markaDom = tavlijs.candi.marka.domGet().appendTo(tavlijs.arena);
	let r = markaDom.width() / 2;
	let offset = markaDom.parent().offset();

	tavlijs.candi.markaLeft0 = x - r - offset.top;
	tavlijs.candi.markaTop0 = y - r - offset.left;

	markaDom.
	css({
		'left': tavlijs.candi.markaLeft0 + 'px',
		'top': tavlijs.candi.markaTop0 + 'px',
	});

	return tavlijs;
};

tavlijs.oxiCandi = function() {
	return !tavlijs.candi.what;
};

tavlijs.candiSetTimestamp = 0;

tavlijs.init = function(arena) {
	let bodyDom = $(document.body);

	if (!arena)
	arena = bodyDom;

	tavlijs.arena = arena;

	arena.
	addClass('tavlijsArena').
	on('mousedown', '.tavlijsThiki,.tavlijsThesi,.tavlijsExo', function(e) {
		tavlijs.candiSet(e, $(this).data('stili'));
	});

	$(window).
	on('mousemove', function(e) {
		tavlijs.mouseMove(e);
	}).
	on('mouseup', function(e) {
		tavlijs.mouseUp(e);
	});

	return tavlijs;
};

tavlijs.mouseMove = function(e) {
	e.preventDefault();
	e.stopPropagation();

	if (!tavlijs.candi.marka)
	return tavlijs;

	tavlijs.ipodoxiClear();
	tavlijs.ipodoxiLocate(e);

	let marka = tavlijs.candi.marka;
	let markaDom = marka.domGet();

	let x0 = tavlijs.candi.markaX0;
	let y0 = tavlijs.candi.markaY0;

	let dx = e.pageX - x0;
	let dy = e.pageY - y0;

	let markaLeft = tavlijs.candi.markaLeft0 + dx;
	let markaTop = tavlijs.candi.markaTop0 + dy;

	markaDom.css({
		'left': markaLeft + 'px',
		'top': markaTop + 'px',
	});

	return tavlijs;
};

tavlijs.mouseUp = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let candi = tavlijs.candi.pouli;

	tavlijs.candiClear();

	if (!tavlijs.ipodoxi)
	return tavlijs;

	if (!candi)
	return tavlijs;

	let ipodoxiDom = tavlijs.ipodoxi;
	let dana = ipodoxiDom.data('stili').dana;

	dana.candiPush(candi);

	tavlijs.ipodoxiClear();
	return tavlijs;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.ipodoxiLocate = function(e) {
	let tavli = tavlijs.candi.marka.tavli;
	let tavliDom = tavli.domGet();

	tavlijs.ipodoxiClear();
	tavliDom.
	find('.tavlijsThesi,.tavlijsThiki,.tavlijsExo').
	each(function() {
		if (tavlijs.pointOutsideElement(e, $(this)))
		return true;

		tavlijs.ipodoxiSet($(this));
		return false;
	});

	return tavlijs;
};

tavlijs.ipodoxi = undefined;

tavlijs.ipodoxiSet = function(dom) {
	tavlijs.ipodoxiClear();
	tavlijs.ipodoxi = dom.addClass('tavlijsIpodoxi');

	return tavlijs;
};

tavlijs.ipodoxiClear = function() {
	if (!tavlijs.ipodoxi)
	return tavlijs;

	tavlijs.ipodoxi.removeClass('tavlijsIpodoxi');
	tavlijs.ipodoxi = undefined;

	return tavlijs;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pointOutsideElement = function(e, dom) {
	let x = e.pageX;
	let y = e.pageY;

	let domOffset = dom.offset();
	let x0 = domOffset.left;
	let y0 = domOffset.top;

	let w = dom.width();
	let h = dom.height();

	let x1 = x0 + w;
	let y1 = y0 + h;

	if (x < x0)
	return true;

	if (x > x1)
	return true;

	if (y < y0)
	return true;

	if (y > y1)
	return true;

	return false;
};
