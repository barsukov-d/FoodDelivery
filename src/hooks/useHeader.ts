import type { ILang, IModeTeme } from 'src/types/user';
import { Dark, useQuasar } from 'quasar';

export const useHeader = () => {
	const { t, locale } = useI18n();
	const $q = useQuasar();

	const langOptions = ref<ILang[]>([
		{ value: 'en', label: 'ENG' },
		{ value: 'ru', label: 'RUS' },
	]);

	const modeOptions = ref<IModeTeme[]>([
		{ value: true, label: t('themeOptions.dark') },
		{ value: false, label: t('themeOptions.light') },
		{ value: 'auto', label: t('themeOptions.auto') },
	]);

	const modeButtonLabel = computed(() => {
		return modeOptions.value.find((item) => item.value === $q.dark.mode)
			?.label;
	});

	const langButtonLabel = computed(() => {
		return langOptions.value.find((item) => item.value === locale.value)
			?.label;
	});

	const setLocale = (loc: string) => {
		locale.value = loc;
		nextTick();
	};

	const setMode = (mode: boolean | 'auto') => {
		$q.dark.set(mode);
	};

	onMounted(() => {
		$q.dark.set('auto');
	});

	// const setDartTheme = () => {
	// 	root.style.setProperty('--q-primary', 'red');
	// 	root.style.setProperty('--q-background-color', 'blue');
	// };

	// const setLightTheme = () => {
	// 	root.style.setProperty('--q-primary', 'blue');
	// 	root.style.setProperty('--q-background-color', 'red');
	// };

	// watch(
	// 	() => $q.dark.isActive,
	// 	() => {
	// 		$q.dark.isActive ? setDartTheme() : setLightTheme();
	// 	}
	// );

	watch(
		() => locale.value,
		() => {
			console.log(123);

			modeOptions.value = [
				{ value: true, label: t('themeOptions.dark') },
				{ value: false, label: t('themeOptions.light') },
				{ value: 'auto', label: t('themeOptions.auto') },
			];
		}
	);

	return {
		langOptions,
		modeOptions,
		modeButtonLabel,
		langButtonLabel,
		setLocale,
		setMode,
	};
};
