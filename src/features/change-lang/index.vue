<script setup lang="ts">
defineProps<{
	label: string;
}>();

const emit = defineEmits<{
	(e: 'setLocale', value: 'en' | 'ru'): void;
}>();
</script>

<template lang="pug">
q-btn(color='secondary', :label='label')
	q-menu(:offset='[0, 16]')
		q-list(style='min-width: 100px')
			q-item(clickable, v-close-popup, @click='emit("setLocale", "en")')
				q-item-section English
			q-item(clickable, v-close-popup, @click='emit("setLocale", "ru")')
				q-item-section Russian
</template>
