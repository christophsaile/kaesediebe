function generateCacheName() {
	const timestamp = Date.now();
	return `my-cache-${timestamp}`;
}

module.exports = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{html,css,png,ico,js,json,webp}'],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
	runtimeCaching: [
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|webp|html|css|js|json)$/,
			handler: 'CacheFirst',
			options: {
				cacheName: generateCacheName(),
				expiration: {
					maxEntries: 10,
					maxAgeSeconds: 24 * 60 * 60,
				},
			},
		},
	],
};
