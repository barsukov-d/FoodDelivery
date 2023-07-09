<script setup lang="ts">
import type { IBanner } from 'src/types/banners';
defineProps<{
	banner: IBanner;
}>();
</script>

<template lang="pug">
q-card.my-card
	q-img(src='https://cdn.quasar.dev/img/parallax2.jpg', class='aspect-[22/9]')
		.absolute-top.text-subtitle2.text-center {{ banner.text }}

//- .q-card.rounded-4xl
//- 	q-item.p-0.h-40.overflow-hidden
//- 		q-item-section
//- 			q-img.h-full.object-cover(:src='banner.image')
</template>
