<script setup lang="ts">
import PageHeader from 'src/shared/page/header.vue';
</script>
<template lang="pug">
q-page
	PageHeader(header='Кабинет')

	router-view
</template>
