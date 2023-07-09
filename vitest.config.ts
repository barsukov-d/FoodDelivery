import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		env: { API_URL: 'http://api.service.ru' },
		globals: true,
		environment: 'jsdom',
		clearMocks: true,
		include: ['./src/**/*.spec.ts'],
		setupFiles: [
			'fake-indexeddb/auto',
			'./src/mocks/server.ts',
			'./src/test/setup.ts',
		],
	},
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		quasar({
			sassVariables: 'src/quasar-variables.scss',
		}),
		tsconfigPaths(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'quasar',
				'vue-i18n',
				'pinia',
				{ 'src/hooks/useWait': ['useWait'] },
				{ '@vuelidate/core': ['useVuelidate'] },
			],
			dts: true, // generate TypeScript declaration
		}),
	],
});
