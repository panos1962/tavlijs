"use strict";

var tavlijs = {};

tavlijs.pexnidiPortes = 'ΠΟΡΤΕΣ';
tavlijs.pexnidiPlakoto = 'ΠΛΑΚΩΤΟ';
tavlijs.pexnidiFevga = 'ΦΕΥΓΑ';

tavlijs.platosDefault = 600;

tavlijs.pektis = undefined;
tavlijs.theatis = undefined;

tavlijs.epomenosCheckOn = true;

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pektisSet = function(pektis) {
	tavlijs.pektis = undefined;
	tavlijs.theatis = undefined;

	switch (pektis) {
	case 0:
	case 1:
		tavlijs.pektis = pektis;
		break;
	}

	return tavlijs;
};

tavlijs.isPektis = function() {
	return (tavlijs.pektis !== undefined);
};

tavlijs.oxiPektis = function() {
	return !tavlijs.isPektis();
};

tavlijs.theatisSet = function(pektis) {
	tavlijs.pektis = undefined;
	tavlijs.theatis = undefined;

	switch (pektis) {
	case 0:
	case 1:
		tavlijs.theatis = pektis;
		break;
	}

	return tavlijs;
};

tavlijs.isTheatis = function() {
	return (tavlijs.theatis === undefined);
};

tavlijs.oxiTheatis = function() {
	return !tavlijs.isTheatis();
};

tavlijs.isThiki = function(stili) {
	if (stili === undefined)
	return false;

	if (typeof(stili) !== 'object')
	return false;

	return (stili instanceof tavlijs.thiki);
};

tavlijs.oxiThiki = function(stili) {
	return !tavlijs.isThiki(stili);
};

tavlijs.isExo = function(stili) {
	if (stili === undefined)
	return false;

	if (typeof(stili) !== 'object')
	return false;

	return (stili instanceof tavlijs.exo);
};

tavlijs.oxiExo = function(stili) {
	return !tavlijs.isExo(stili);
};

tavlijs.isThesi = function(stili) {
	if (stili === undefined)
	return false;

	if (typeof(stili) !== 'object')
	return false;

	return (stili instanceof tavlijs.thesi);
};

tavlijs.oxiThesi = function(stili) {
	return !tavlijs.isThesi(stili);
};

///////////////////////////////////////////////////////////////////////////////@

// Κάθε τάβλι έχει ένα συνολικό πλάτος στο οποίο, εκτός από το κυρίως ταμπλό
// όπου παίζεται το παιχνίδι, περιλαμβάνονται και οι πλαϊνές ντάνες (αριστερά
// τα μαζεμένα πούλια και δεξιά τα χτυπημένα πούλια). Το κάτω μέρος αφορά στον
// παίκτη 0, ενώ το επάνω μέρος αφορά στον παίκτη 1. Περιλαμβάνονται ακόμη τα
// ζάρια και το πλήθος των παιξιών που έχουν παιχτεί και αφορούν σε κάθε
// συγκεκριμένη ζαριά.

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

// Ακολουθούν μέθοδοι που αφορούν στο είδος του τρέχοντος παιχνιδιού.

tavlijs.tavli.prototype.portesSet = function() {
	this.pexnidi = tavlijs.pexnidiPortes;
	return this;
};

tavlijs.tavli.prototype.isPortes = function() {
	return (this.pexnidi === tavlijs.pexnidiPortes);
};

tavlijs.tavli.prototype.oxiPortes = function() {
	return !this.isPortes();
};

tavlijs.tavli.prototype.plakotoSet = function() {
	this.pexnidi = tavlijs.pexnidiPlakoto;
	return this;
};

tavlijs.tavli.prototype.isPlakoto = function() {
	return (this.pexnidi === tavlijs.pexnidiPlakoto);
};

tavlijs.tavli.prototype.oxiPlakoto = function() {
	return !this.isPlakoto();
};

tavlijs.tavli.prototype.fevgaSet = function() {
	this.pexnidi = tavlijs.pexnidiFevga;
	return this;
};

tavlijs.tavli.prototype.isFevga = function() {
	return (this.pexnidi === tavlijs.pexnidiFevga);
};

tavlijs.tavli.prototype.oxiFevga = function() {
	return !this.isFevga();
};

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

tavlijs.tavli.prototype.isEpomenos = function(pektis) {
	if (this.epomenos === undefined)
	return false;

	if (pektis === undefined)
	return false;

	if (!tavlijs.epomenosCheckOn)
	return true;

	return (pektis === this.epomenos);
};

tavlijs.tavli.prototype.oxiEpomenos = function(pektis) {
	return !this.isEpomenos(pektis);
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
	let w = this.tavli.platos * 0.2;
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
	let w = this.tavli.platos * 0.06415;
	let h = this.tavli.platos * 0.3975;
	let x = (this.id % 6) * w;

	let dom = $('<div>').
	data('stili', this).
	addClass('tavlijsThesi').
	css({
		'width': w + 'px',
		'height': h + 'px',
		'left': x + 'px',
	});

	w = this.tavli.platos * 0.0625;

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

///////////////////////////////////////////////////////////////////////////////@

tavlijs.pouli = function(tavli, pektis) {
	this.tavli = tavli;

	if (pektis !== undefined)
	this.pektis = pektis;
};

tavlijs.pouli.prototype.kermaDom = function() {
	let w = this.tavli.platos * 0.06415;
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
	addClass('tavlijsPouli').
	addClass('tavlijsPouliKerma').
	append(svgDom);

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
	data('pouli', this).
	addClass('tavlijsPouli').
	addClass('tavlijsPouliPlaka').
	append(svgDom);

	return dom;
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
	attr('src', 'ikona/zari/' + this.face + '.png').
	addClass('tavlijsZari');

	return dom;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.epileximiCheck = function(e, stiliDom) {
	e.preventDefault();
	e.stopPropagation();

	if (tavlijs.oxiPektis())
	return tavlijs;

	let stili = stiliDom.data('stili');

	if (!stili)
	return tavlijs;

	if (stili.dana.countGet() <= 0)
	return tavlijs;

	let tavli = stili.tavli;

	if (!tavli)
	return tavlijs;

	if (tavli.oxiEpomenos(tavlijs.pektis))
	return tavlijs;

	let epomenos = tavli.epomenos;

console.log(epomenos);
	if (tavli.exo[epomenos].dana.countGet() > 0) {
		if (!(stili instanceof tavlijs.exo))
		return tavlijs;

		if (stili.pektis !== tavlijs.pektis)
		return tavlijs;

		stiliDom.addClass('stiliEpileximo')
	}

	if (tavlijs.isThiki(stili) && (stili.pektis !== tavlijs.pektis))
	return tavlijs;

	if (tavlijs.isExo(stili) && (stili.pektis !== tavlijs.pektis))
	return tavlijs;
};

///////////////////////////////////////////////////////////////////////////////@

// Με τον όρο "candi" εννοούμε το υποψήφιο προς παίξιμο πούλι. Αυτό μπορεί να
// είναι ένα πούλι από τη θήκη του παίκτη, ή ένα πούλι από κάποια θέση του
// board, ή ακόμη και ένα χτυπημένο πούλι του παίκτη. Ωστόσο, ως "candi"
// ορίζουμε ένα γενικότερο αντικείμενο το οποίο περιέχει το υποψήφιο πούλι
// ως property, αλλά περιλαμβάνει και άλλα στοιχεία.

tavlijs.candi = {
	// Το property "pouliDom" είναι το dom element του υποψήφιου προς
	// παίξιμο πουλιού.

	'pouliDom': undefined,

	// Το property "pouli" είναι το αντίστοιχο αντικείμενο.

	'pouli': undefined,

	// Το property "tavli" είναι το αντίστοιχο αντικείμενο.

	'tavli': undefined,

	// Το property "markaDom" είναι το dom element ενός ξαμολημένου
	// πουλιού που απλώς ακολουθεί το ποντίκι μας σε περίπτωση που
	// σύρουμε το υποψήφιο πούλι προς τη στήλη υποδοχής. Το πούλι
	// "markaDom" είναι προσωρινό και υφίσταται μόνο όσο διαρκεί
	// η αναζήτηση στήλης υποδοχής.

	'markaDom': undefined,

	// Το property "ipodoxiDom" είναι το dom element της στήλης υποδοχής
	// του υποψήφιου προς παίξιμο πουλιού.

	'ipodoxiDom': undefined,
};

// Η function "candiSet" καλείται on mousedown σε στήλες (θήκες, έξω και
// θέσεις). Σκοπός της function είναι να θέσει το υποψήφιο προς παίξιμο
// πούλι το οποίο είναι το τελευταίο πούλι της στήλης.

tavlijs.candiSet = function(e, dom) {
	e.preventDefault();
	e.stopPropagation();

	// Πρώτα ακυρώνουμε τυχόν υφιστάμενο candi.

	tavlijs.candiClear();

	// Το dom element αφορά σε κάποια στήλη (θήκη, έξω ή θέση). Η στήλη
	// μπορεί να έχει ή να μην έχει πούλια. Σε κάθε περίπτωση, πάντως,
	// δημιουργούμε λίστα με τα dom elements των πουλιών της στήλης.

	let plist = dom.children('.tavlijsPouli');

	// Αν η στήλη δεν περιέχει πούλια, τότε δεν υπάρχει πούλι προς επιλογή.

	if (plist.length <= 0)
	return tavlijs;

	// Η στήλη έχει πούλια, οπότε επιλέγουμε το τελευταίο πούλι της στήλης
	// και φέρνουμε στην επιφάνεια και το αντίστοιχο πούλι, αλλά και το
	// τάβλι, ως αντικείμενα.

	let pouliDom = plist.last();
	let pouli = pouliDom.data('pouli');
	let tavli = pouli.tavli;

	// Αν το τελευταίο πούλι της στήλης δεν ανήκει στον παίκτη που έχει
	// σειρά να παίξει, τότε ακυρώνουμε τη διαδικασία.

	let pektis = pouli.pektis;

	if (pektis !== tavli.epomenos)
	return tavlijs;

	// Σε αυτό το σημείο έχουμε περάσει τους απαραίτητους ελέγχους και
	// θέτουμε το υποψήφιο προς παίξιμο πούλι μαζί με άλλα σχετικά
	// properties.

	tavlijs.candi.timestamp = Date.now();
	tavlijs.candi.pouliDom = pouliDom;
	tavlijs.candi.pouli = pouli;
	tavlijs.candi.tavli = tavli;

	// Χρωματίζουμε κατάλληλα το υποψήφιο προς παίξιμο πούλι.

	tavlijs.candiXromaSet(true);

	// Κρατάμε τη θέση του ποντικιού τη στιγμή που επιλέγουμε το candi.

	tavlijs.candi.markaX0 = e.pageX;
	tavlijs.candi.markaY0 = e.pageY;

	return tavlijs;
};

// Για να ελέγξουμε αν υφίσταται υποψήφιο για παίξιμο πούλι, ελέγχουμε το
// property "pouliDom".

tavlijs.isCandi = function() {
	return tavlijs.candi.pouliDom;
};

tavlijs.oxiCandi = function() {
	return !tavlijs.isCandi();
};

tavlijs.candiClear = function() {
	if (tavlijs.oxiCandi())
	return tavlijs;

	tavlijs.ipodoxiClear();
	tavlijs.markaClear();
	tavlijs.candiXromaSet(false);
	tavlijs.candi.tavli = undefined;
	tavlijs.candi.pouli = undefined;
	tavlijs.candi.pouliDom = undefined;
	tavlijs.candi.timestamp = 0;

	return tavlijs;
};

tavlijs.candiXromaSet = function(xromatismos) {
	if (tavlijs.oxiCandi())
	return tavlijs;

	// XXX
	// Θα μπορούσαμε να κάνουμε την αλλαγή χρησιμοποιώντας jQuery,
	// αλλά το jQuery δεν υποστηρίζει πλήρως τα svg elements, οπότε
	// καταφεύγουμε vanilla javascript.

	tavlijs.candi.pouliDom.

	// Εντοπίζουμε το svg element του πουλιού ως jQuery list.

	children('svg').

	// Εντοπίζουμε την περιοχή χρωματισμού που είναι το δεύτερο στοιχείο
	// του svg (κύκλος για κέρματα, ορθογώνιο για πλακίδια).

	children()

	// Εντοπίζουμε την περιοχή χρωματισμού ως plain dom element.

	[1]

	// Εντοπίζουμε τη λίστα κλάσεων του εν λόγω plain dom element και...
	.classList

	// ...προσθέτουμε ή αφαιρούμε τον χρωματισμό υποψηφίου προς παίξιμο
	// πουλιού, ανάλογα με την παράμετρο που έχει δοθεί.

	[xromatismos ? 'add' : 'remove']
	('tavlijsPouliCandi' + tavlijs.candi.tavli.epomenos);

	return tavlijs;
};

tavlijs.markaSet = function() {
	if (tavlijs.isMarka())
	tavlijs.markaClear();

	if (tavlijs.oxiCandi())
	return tavlijs;

	tavlijs.candi.markaDom = (new tavlijs.pouli(
		tavlijs.candi.tavli,
		tavlijs.candi.tavli.epomenos
	)).
	kermaDom().
	addClass('tavlijsMarka').
	appendTo(tavlijs.arena);

	return tavlijs;
};

tavlijs.markaClear = function() {
	if (tavlijs.oxiMarka())
	return tavlijs;

	tavlijs.candi.markaDom.remove();
	tavlijs.candi.markaDom = undefined;

	return tavlijs;
};

tavlijs.isMarka = function() {
	return tavlijs.candi.markaDom;
};

tavlijs.oxiMarka = function() {
	return !tavlijs.isMarka();
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.ipodoxi = function(stiliDom) {
	let ipodoxi = this;

	this.stiliDom = stiliDom;
	this.stili = stiliDom.data('stili');
	this.tavli = tavlijs.candi.tavli;
	this.pektis = this.tavli.epomenos;
	this.antipalos = (this.pektis ? 0 : 1);

	this.plist = stiliDom.children('.tavlijsPouli');

	this.pcount = [
		0,
		0,
	];
	this.ptotal = 0;

	this.plist.each(function() {
		let pouli = $(this).data('pouli');
		ipodoxi.pcount[pouli.pektis]++;
		ipodoxi.ptotal++;
	});

	this.pouliFirst = this.plist.first();
	this.pouliLast = this.plist.last();
};

tavlijs.ipodoxi.prototype.isThiki = function() {
	return tavlijs.isThiki(this.stili);
};

tavlijs.ipodoxi.prototype.oxiThiki = function() {
	return !this.isThiki();
};

tavlijs.ipodoxi.prototype.isThesi = function() {
	return tavlijs.isThesi(this.stili);
};

tavlijs.ipodoxi.prototype.oxiThesi = function() {
	return !this.isThesi();
};

tavlijs.ipodoxi.prototype.isAdia = function() {
	return (this.ptotal <= 0);
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.ipodoxiSet = function(ipodoxiDom) {
	tavlijs.ipodoxiClear();
	tavlijs.candi.ipodoxiDom = ipodoxiDom.addClass('tavlijsIpodoxi');

	return tavlijs;
};

tavlijs.ipodoxiClear = function() {
	if (tavlijs.oxiIpodoxi())
	return tavlijs;

	tavlijs.candi.ipodoxiDom.removeClass('tavlijsIpodoxi');
	tavlijs.candi.ipodoxiDom = undefined;

	return tavlijs;
};

tavlijs.isIpodoxi = function() {
	return tavlijs.candi.ipodoxiDom;
};

tavlijs.oxiIpodoxi = function() {
	return !tavlijs.isIpodoxi();
};

tavlijs.oxiIpodoxeas = function(stiliDom) {
	if (tavlijs.oxiCandi())
	return true;

	let ipodoxi = new tavlijs.ipodoxi(stiliDom);

	if (ipodoxi.pouliLast.data('pouli') === tavlijs.candi.pouliDom.data('pouli'))
	return true;

	if (ipodoxi.isThiki() && (ipodoxi.stili.pektis !== ipodoxi.pektis))
	return true;

	if (ipodoxi.isThesi()) {
		if (ipodoxi.isAdia())
		return false;

		if (ipodoxi.pouliLast.data('pouli').pektis === ipodoxi.pektis)
		return false;

		if (ipodoxi.ptotal !== 1)
		return true;

		return ipodoxi.tavli.oxiPortes();
	}

	return false;
};

tavlijs.ipodoxiLocate = function(e) {
	if (tavlijs.oxiCandi())
	return tavlijs;

	let tavliDom = tavlijs.candi.pouliDom.closest('.tavlijsTavli');
	tavlijs.ipodoxiClear();

	tavliDom.
	find('.tavlijsThesi,.tavlijsThiki').
	each(function() {
		if (tavlijs.pointOutsideElement(e, $(this)))
		return true;

		if (tavlijs.oxiIpodoxeas($(this)))
		return true;

		tavlijs.ipodoxiSet($(this));
		return false;
	});

	return tavlijs;
};

///////////////////////////////////////////////////////////////////////////////@

tavlijs.init = function(arena) {
	let bodyDom = $(document.body);

	if (!arena)
	arena = bodyDom;

	tavlijs.arena = arena;

	arena.
	addClass('tavlijsArena').
	on('mouseenter', '.tavlijsThiki,.tavlijsThesi,.tavlijsExo', function(e) {
		tavlijs.epileximiCheck(e, $(this));
	}).
	on('mousedown', '.tavlijsThiki,.tavlijsThesi,.tavlijsExo', function(e) {
		tavlijs.candiSet(e, $(this));
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

	if (tavlijs.oxiCandi())
	return tavlijs;

	if (tavlijs.oxiMarka())
	tavlijs.markaSet();

	let markaDom = tavlijs.candi.markaDom;
	let r = markaDom.width() / 2;
	let offset = tavlijs.arena.offset();

	// Έχουμε κρατήσει τη θέση του ποντικιού κατά την επιλογή του candi.
	// Με βάση εκείνες τις συντεταγμένες τοποθετούμε στη σωστή θέση τη
	// μάρκα.

	let x0 = tavlijs.candi.markaX0;
	let y0 = tavlijs.candi.markaY0;

	let dx = e.pageX - x0;
	let dy = e.pageY - y0;

	let x = tavlijs.candi.markaX0 + dx - r - offset.left;
	let y = tavlijs.candi.markaY0 + dy - r - offset.top;

	markaDom.css({
		'left': x + 'px',
		'top': y + 'px',
	});

	tavlijs.ipodoxiClear();
	tavlijs.ipodoxiLocate(e);

	return tavlijs;
};

tavlijs.mouseUp = function(e) {
	e.preventDefault();
	e.stopPropagation();

	if (tavlijs.oxiCandi())
	return tavlijs;

	if ((Date.now() - tavlijs.candi.timestamp) < 200)
	return tavlijs;

	tavlijs.candiClear();
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
