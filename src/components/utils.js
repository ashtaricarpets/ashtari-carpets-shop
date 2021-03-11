import numeral from 'numeral';

// load a locale
numeral.register('locale', 'be', {
	delimiters: {
		thousands: ' ',
		decimal: ','
	},
	abbreviations: {
		thousand: 'k',
		million: 'm',
		billion: 'b',
		trillion: 't'
	},
	ordinal: number => (number % 10 === 1 ? 'ste' : 'de'),
	currency: {
		symbol: '€'
	}
});

// switch between locales
numeral.locale('be');

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatePhone(phone) {
	const re = /^[0-9+]{1,}[0-9\-\s]{3,15}$/;
	return re.test(phone);
}

function slugify(text) {
	if (!text) return '';
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

const noDecimalsFrom = 500;

function roundTo(n, digits) {
	digits = digits || 0;
	return Math.round(n * 10 ** digits) / 10 ** digits;
}

function finalDisplay(price) {
	return price > noDecimalsFrom ? numeral(price).format('0,0') : numeral(price).format('0,0.00');
}

function finalDisplayPrecise(price) {
	return numeral(price).format('0,0.00');
}

function cartTotals(cart) {
	return cart.reduce((p, c) => {
		const price = computePrice(c);
		const vat = price - (price / 1.21);
		p.total += price;
		p.vat += vat;
		return p;
	}, {
		total: 0,
		vat: 0,
	});
}

function computePrice(item) {
	let price = 0;
	if (item.custommade === 'yes') {
		price = item.amount * (item.customLength * item.customWidth / 10000 * item.price_per_unit);
	} else {
		price = item.amount * (item.price);
	}
	if (item.discount) price *= (1 - item.discount * 0.01);
	return price;
}

export {
	validateEmail,
	validatePhone,
	slugify,
	roundTo,
	finalDisplay,
	finalDisplayPrecise,
	cartTotals
};
