module.exports = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{html,css,png,ico,js,json,webp}'],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
