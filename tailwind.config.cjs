/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
		plugin(function ({ addBase, config }) {
			addBase({
				ol: { listStyle: 'decimal', paddingLeft: '1.5rem' },
				li: { paddingTop: '1rem' },
			});
		}),
	],
	daisyui: {
		themes: [
			{
				kaesediebe: {
					primary: '#fef08a',
					secondary: '#d9f99d',
					accent: '#37CDBE',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
		],
	},
};
