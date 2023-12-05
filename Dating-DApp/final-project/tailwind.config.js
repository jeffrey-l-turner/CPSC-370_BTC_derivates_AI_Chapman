/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				chapman: {
					primary: '#be123c',
					secondary: '#231F20',
					accent: '#fb7185',
					neutral: '#1f2937',
					'base-100': '#ffffff',
					info: '#93c5fd',
					success: '#6ee7b7',
					warning: '#fde047',
					error: '#fda4af'
				}
			}
		]
	}
};
