import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		tailwind(),
		[vue({ appEntrypoint: '/src/pages/_app' })],
	],
});
