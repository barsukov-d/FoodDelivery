<script setup lang="ts">
import Menu from 'src/features/menu/index.vue';
import WidgetsHeader from 'src/widgets/header/index.vue';
import HeaderOptions from 'src/features/heder-options/index.vue';
import { useDefaultLayout } from 'src/hooks/useDefaultLayout';

const {
	toggleLeftDrawer,
	setMode,
	setLocale,
	modeButtonLabel,
	langButtonLabel,
	leftDrawerOpen,
} = useDefaultLayout();
</script>

<template lang="pug">
q-layout(view='hHh lpR fff')
	WidgetsHeader(@toggleLeftDrawer='toggleLeftDrawer')
	q-drawer.p-4(v-model='leftDrawerOpen', side='left', overlay, bordered)
		HeaderOptions(
			@setMode='setMode($event)',
			@setLocale='setLocale($event)',
			:labelTheme='modeButtonLabel',
			:labelLang='langButtonLabel'
		)
	q-page-container.px-0.container.mx-auto
		RouterView.px-1.pb-36(v-slot='{ Component }')
			Suspense
				component(:is='Component')
	q-footer.bg-grey-8.text-white.d-none(class='sm:block', elevated)
		q-toolbar.py-6
			q-toolbar-title.container.mx-auto
				q-avatar
					img(src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg')
				|
				| FoodDelivery
	Menu.mx-auto.max-w-full(class='sm:hidden')
</template>
