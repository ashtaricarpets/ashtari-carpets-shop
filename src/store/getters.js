function findActiveFilters(filters = []) {
	return filters.filter(f => {
		if (f.type === 'number') {
			return f.values[0] !== f.min || f.values[1] !== f.max;
		}
		if (f.type === 'enum' || f.type === 'array') {
			return f.values.filter(v => v.checked).length > 0;
		}
		if (f.type === 'search' && f.value) {
			return true;
		}
		return false;
	});
}

export default {
	getProductById: state => id => state.products.find(product => product.id === id),
	isSidebarOpen: state =>
		state.userInfo.cartProducts.length > 0 ||
		state.userInfo.favoriteProducts.length > 0 ||
		state.userInfo.recentProducts.length > 0,
	product: state => state.currentProduct,
	width: state => state.userInfo.rugSize.width,
	length: state => state.userInfo.rugSize.length,
	favoriteProductIds: state => state.userInfo.favoriteProducts.map(f => f.id),
	userRugSizeKnown: state => state.userInfo.rugSize.hasUpdated,
	numberOfCartProducts: state => state.userInfo.cartProducts.map(p => p.amount).reduce((p, c) => p + c, 0),
	numberOfFavProducts: state => state.userInfo.favoriteProducts.length,
	activeFilters: state => findActiveFilters(state.productfilters),
};
