module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,css,png,ico,js,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};