import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';
import path from 'path';

export default defineConfig({
	plugins: [
		tailwindcss(),
		yaml(),
		sveltekit(),
		{
			name: 'watch-static-document-parts',
			configureServer(server) {
				const filesDir = path.resolve('static/files/');
				server.watcher.add(filesDir);
				server.watcher.on('change', (file) => {
					if (file.startsWith(filesDir)) {
						server.ws.send({ type: 'full-reload' });
					}
				});
			}
		}
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
		watch: {
			usePolling: true
		}
	}
});