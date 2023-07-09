const { colors } = require('./theme/colors.js');

const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function (/* ctx */) {
	return {
		eslint: {
			warnings: true,
			errors: true,
		},

		boot: ['i18n', 'msw', 'wait'],

		css: ['app.scss'],

		extras: ['roboto-font', 'material-icons'],

		build: {
			env: { API_URL: 'http://api.service.ru', JWT_SECRET: 'secret' },

			target: {
				browser: [
					'es2019',
					'edge88',
					'firefox78',
					'chrome87',
					'safari13.1',
				],
				node: 'node16',
			},

			vueRouterMode: 'history',

			vitePlugins: [
				[
					'@intlify/vite-plugin-vue-i18n',
					{
						include: path.resolve(__dirname, './src/i18n/**'),
					},
				],
				[
					'unplugin-auto-import/vite',
					{
						// targets to transform
						include: [
							/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
							/\.vue$/,
							/\.vue\?vue/, // .vue
							/\.md$/, // .md
						],
						// global imports to register
						imports: [
							'vue',
							'vue-router',
							'quasar',
							'vue-i18n',
							'pinia',
							{ 'src/hooks/useWait': ['useWait'] },
							{ '@vuelidate/core': ['useVuelidate'] },
						],
						defaultExportByFilename: false,
						dirs: [],
						dts: './src/types/auto-imports.d.ts',
						vueTemplate: true,
						resolvers: [],
						eslintrc: {
							enabled: false,
							filepath: './.eslintrc-auto-import.json',
							globalsPropValue: true,
						},
					},
				],
			],
		},

		devServer: {
			open: false,
		},

		framework: {
			config: {
				// notify: {
				// 	/* look at QuasarConfOptions from the API card */
				// },
				brand: {
					...colors,
				},
			},

			plugins: [
				'Dialog',
				// 'Notify'
			],
		},

		animations: [],

		ssr: {
			pwa: false,
			prodPort: 3000,
			middlewares: ['render'],
		},

		pwa: {
			workboxMode: 'generateSW',
			injectPwaMetaTags: true,
			swFilename: 'sw.js',
			manifestFilename: 'manifest.json',
			useCredentialsForManifestTag: false,
		},

		cordova: {},

		capacitor: {
			hideSplashscreen: true,
		},

		electron: {
			inspectPort: 5858,

			bundler: 'packager',

			packager: {},

			builder: {
				appId: 'kolhida-app',
			},
		},

		bex: {
			contentScripts: ['my-content-script'],
		},
	};
});
