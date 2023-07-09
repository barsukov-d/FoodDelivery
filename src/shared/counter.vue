<script setup lang="ts">
defineProps<{
	setCount: number;
}>();

const emit = defineEmits<{
	(e: 'count', count: number): void;
}>();

const count = ref(1);

watch(count, (val) => {
	emit('count', val);
});
</script>

<template lang="pug">
.flex.items-center.justify-between
	q-btn.w-10.h-10.text-xs(
		@click='count++',
		round,
		color='primary',
		icon='add',
		:disable='setCount >= 99'
	)
	span {{ setCount }}
	q-btn.w-10.h-10.text-xs(
		@click='count--',
		round,
		color='primary',
		icon='remove',
		:disable='setCount <= 0'
	)
</template>
