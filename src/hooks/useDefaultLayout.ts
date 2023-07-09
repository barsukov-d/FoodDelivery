import type { ILang, IModeTeme } from 'src/types/user';

export const useDefaultLayout = () => {
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

	const leftDrawerOpen = ref(false);

	const toggleLeftDrawer = () => {
		leftDrawerOpen.value = !leftDrawerOpen.value;
	};

	// const modeButtonLabel = ref<string>('Auto');
	// const langButtonLabel = ref<string>('ENG');

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
	};

	const setMode = (mode: boolean | 'auto') => {
		$q.dark.set(mode);
	};

	onMounted(() => {
		$q.dark.set('auto');
	});

	return {
		toggleLeftDrawer,
		leftDrawerOpen,
		modeButtonLabel,
		langButtonLabel,
		langOptions,
		modeOptions,
		setLocale,
		setMode,
	};
};
