<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, FreeMode } from 'swiper';
import { useSwiper } from 'swiper/vue';

import { useCategories } from 'src/hooks/useCategories';

import CategoryCard from 'src/entities/category/card.vue';

const route = useRoute();
const router = useRouter();

const $w = useWait();

const modules = [Navigation, FreeMode];
const swiper = useSwiper();
console.log(swiper, 'swiper1');

const { categories, fetchCategories, fetchCategoriesLoadingSymbol } =
	useCategories();

const toCategory = (id: number) => {
	router.push({ name: 'category', params: { id } });
};

watch(
	() => route.params.id,
	() => {
		console.log('route.params.id', route.params.id);
		console.log(swiper, 'swiper2');
	}
);

fetchCategories();
</script>

<template lang="pug">
pre {{ route.params.id }}
template(v-if='$w.is(fetchCategoriesLoadingSymbol)')
	Swiper.h-16(
		:slides-per-view='"auto"',
		:space-between='10',
		:modules='modules',
		:pagination='{ clickable: true }',
		:freeMode='true'
	)
		template(v-for='(category, index) in 10', :key='index')
			SwiperSlide.w-auto
				q-skeleton.h-16.rounded-4xl

template(v-else)
	Swiper.skeleton.h-auto(
		:slides-per-view='"auto"',
		:space-between='10',
		:modules='modules',
		:pagination='{ clickable: true }',
		:freeMode='true'
	)
		template(v-for='(category, index) in categories', :key='index')
			SwiperSlide.w-auto
				CategoryCard.test-1(
					:category='category',
					@toCategory='toCategory',
					:active-category-number='Number(route.params.id)'
				)
</template>

<style scoped>
.swiper-slide {
	width: auto;
}
</style>
