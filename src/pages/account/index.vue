<script setup lang="ts">
import PageHeader from 'src/shared/page/header.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template lang="pug">
q-page
	PageHeader(:header='t("headersName.user")')

	router-view
</template>
