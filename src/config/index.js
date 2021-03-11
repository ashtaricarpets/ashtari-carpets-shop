const shopId = '1ZCzDBK5XnEPgvsR8ZTYum994HV-nmphsC5N7nF8hzVc';

console.log('process.env.NODE_ENV in src/config/index.js', process.env.NODE_ENV);

export default {
	snipcartControlUrl: `https://sheetcommerce.herokuapp.com/shop/${shopId}/snipcart/`,
	server:
		process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production'
			? 'https://sheetcommerce.herokuapp.com'
			: 'http://localhost:8080',
	shop:
		process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production'
			? `https://sheetcommerce.herokuapp.com/shop/${shopId}`
			: `http://localhost:8080/shop/${shopId}`,
	imageLocation: 'https://s3.eu-central-1.amazonaws.com/images-ashtaricarpets',
};
