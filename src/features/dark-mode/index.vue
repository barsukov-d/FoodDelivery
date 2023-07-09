<script setup lang="ts">
defineProps<{
	label: string;
}>();

const emit = defineEmits<{
	(e: 'setMode', value: boolean | 'auto'): void;
}>();
</script>

<template lang="pug">
q-btn.mr-3(color='secondary', :label='label')
	q-menu(:offset='[0, 16]')
		q-list(style='min-width: 100px')
			q-item(clickable, v-close-popup, @click='emit("setMode", true)')
				q-item-section Dark
			q-item(clickable, v-close-popup, @click='emit("setMode", false)')
				q-item-section Light
			q-item(clickable, v-close-popup, @click='emit("setMode", "auto")')
				q-item-section Auto
</template>
