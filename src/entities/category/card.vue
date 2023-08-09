<script setup lang="ts">
import type { ICategory } from 'src/types/categories';

import { computed } from 'vue';

const props = defineProps<{
	category: ICategory;
	activeCategoryNumber: number;
}>();

const emit = defineEmits<{
	(e: 'toCategory', id: number): void;
}>();

const currentCategory = computed(() => {
	return props.category.id === props.activeCategoryNumber;
});
</script>

<template lang="pug">
.q-card.rounded-full.text-primary(
	:class='{ "bg-primary": currentCategory, "bg-secondary": !currentCategory }'
)
	a.p-3.px-5.block.text-center.text-lg.text-white.cursor-pointer(
		@click='() => emit("toCategory", category.id)'
	) {{ category.title }}
</template>
