import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
	plugins: [
		tailwindcss(),
		yaml(),
		sveltekit()
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
		watch: {
			usePolling: true
		}
	}
});
