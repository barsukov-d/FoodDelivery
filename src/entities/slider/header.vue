<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
	header: string;
	subHeader?: string;
	action?: {
		to: RouteLocationRaw;
		label: string;
		color?: string;
	};
	count?: number;
}>();
</script>

<template lang="pug">
.flex.justify-between.items-center.text-primary
	h3.pl-4.uppercase.font-bold.text-xl {{ header }}

	span(v-if='subHeader') {{ subHeader }}
	q-btn.ui-button.rounded-full(
		v-if='action',
		:to='action.to',
		:label='action.label',
		:color='action.color ? action.color : "primary"',
		outline,
		no-caps
	) &nbsp; {{ count }}
</template>
