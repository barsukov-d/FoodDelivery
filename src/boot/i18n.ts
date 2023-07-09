import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/locales';

export type MessageLanguages = keyof typeof messages;
export type MessageSchema = (typeof messages)['en'];

declare module 'vue-i18n' {
	export interface DefineLocaleMessage extends MessageSchema {}
	export interface DefineDateTimeFormat {}
	export interface DefineNumberFormat {}
}

export default boot(({ app }) => {
	const i18n = createI18n({
		locale: 'en',
		legacy: false,
		messages,
	});

	app.use(i18n);
});
