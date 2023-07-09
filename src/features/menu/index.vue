<script setup lang="ts">
import { useMenu } from 'src/hooks/useMenu';
const { tabs, tab } = useMenu();
</script>

<template lang="pug">
q-tabs.w-full.bg-white.text-primary.fixed.justify-around.bottom-0.z-10(
	v-model='tab',
	align='justify',
	active-color='primary',
	color='primary'
)
	template(v-for='(tab, index) in tabs', :key='index')
		q-tab.p-0.pt-1.min-h-max(
			class='w-1/4',
			:name='tab.name',
			:icon='tab.icon',
			:label='tab.label'
		)
			q-badge(v-if='tab.badge', color='secondary', floating) {{ tab.badge }}
</template>
