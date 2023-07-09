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
	:class='{ "bg-primary": currentCategory, "text-white": currentCategory }'
)
	q-item
		q-item-section
			h3.text-center.text-lg(
				@click='() => emit("toCategory", category.id)',
				:class='{ underline: category.id === activeCategoryNumber }'
			) {{ category.title }}
</template>
