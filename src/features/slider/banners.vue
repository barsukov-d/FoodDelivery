<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, FreeMode, Pagination } from 'swiper';

import BannerCard from 'src/entities/banner/card.vue';
import { useBanners } from 'src/hooks/useBanners';
const $w = useWait();

const modules = [Navigation, Pagination];
const { banners, fetchBanners, fetchBannersLoadingSymbol } = useBanners();

const swiperOptions = ref({
	spaceBetween: 20,
	breakpoints: {
		// Define breakpoints for different screen sizes
		640: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4.2,
		},
	},
});

fetchBanners();
</script>

<template lang="pug">
swiper.actions-banners(
	:slides-per-view='1.2',
	:space-between='10',
	:modules='modules',
	:pagination='{ clickable: false }',
	:breakpoints='swiperOptions.breakpoints'
)
	template(v-if='$w.is(fetchBannersLoadingSymbol)')
		swiper-slide(v-for='(banner, index) in 10', :key='index')
			q-skeleton.my-3.h-40(class='aspect-[22/9]')
	template(v-else)
		swiper-slide(v-for='(banner, index) in banners', :key='index')
			BannerCard(:banner='banner')
</template>
