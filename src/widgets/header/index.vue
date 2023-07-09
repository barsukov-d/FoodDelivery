<script setup lang="ts">
import HeaderOptions from 'src/features/heder-options/index.vue';
import { useHeader } from 'src/hooks/useHeader';
import { useCartStore } from 'src/stores/cart';

const { t } = useI18n();
const { modeButtonLabel, langButtonLabel, setMode, setLocale } = useHeader();
const productsCartStore = useCartStore();

const emit = defineEmits<{
	(e: 'toggleLeftDrawer'): void;
}>();
</script>

<template lang="pug">
q-header.bg-primary.text-white(:reveal='true', elevated, height-hint='98')
	q-toolbar.py-0.container.mx-auto.flex
		RouterLink(to='/')
			q-toolbar-title.flex.items-center
				q-avatar.mr-3
					img(src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg')
				h2.inline-flex FoodDelivery
		.flex-1
		q-btn(
			dense,
			flat,
			round,
			icon='menu',
			@click='emit("toggleLeftDrawer")',
			class='sm:hidden'
		)

		HeaderOptions.d-none(
			@setMode='setMode($event)',
			@setLocale='setLocale($event)',
			:labelTheme='modeButtonLabel',
			:labelLang='langButtonLabel',
			class='sm:flex'
		)
	q-tabs.container.mx-auto.d-none(align='left', class='sm:block')
		q-route-tab(to='/category/1', :label='t("menuMobile.dishes")')
		.flex-1
		q-route-tab(to='/account', :label='t("menuMobile.user")')
		q-route-tab(to='/cart', :label='t("menuMobile.cart")')
			q-badge(
				v-if='productsCartStore.totalProducts > 0',
				color='secondary',
				floating
			) {{ productsCartStore.totalProducts }}
</template>
