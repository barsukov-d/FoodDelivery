<script setup lang="ts">
defineProps<{
	labelTheme: string | undefined;
	labelLang: string | undefined;
}>();

const emit = defineEmits<{
	(e: 'setMode', value: boolean | 'auto'): void;
	(e: 'setLocale', value: 'en' | 'ru'): void;
}>();

const { t, locale } = useI18n();
</script>

<template lang="pug">
.wrapp
	.flex.items-center.mb-4(class='sm:mb-0')
		span.mr-3.text-lg {{ t('themeOptions.title') }}
		q-btn.mr-3(color='secondary', :label='labelTheme')
			q-menu(:offset='[0, 16]')
				q-list(style='min-width: 100px')
					q-item(clickable, v-close-popup, @click='emit("setMode", true)')
						q-item-section {{ t('themeOptions.dark') }}
					q-item(clickable, v-close-popup, @click='emit("setMode", false)')
						q-item-section {{ t('themeOptions.light') }}
					q-item(clickable, v-close-popup, @click='emit("setMode", "auto")')
						q-item-section {{ t('themeOptions.auto') }}
	.flex.items-center
		span.mr-3.text-lg {{ t('langOptions.title') }}
		q-btn(color='secondary', :label='labelLang')
			q-menu(:offset='[0, 16]')
				q-list(style='min-width: 100px')
					q-item(clickable, v-close-popup, @click='emit("setLocale", "en")')
						q-item-section English
					q-item(clickable, v-close-popup, @click='emit("setLocale", "ru")')
						q-item-section Russian
</template>
