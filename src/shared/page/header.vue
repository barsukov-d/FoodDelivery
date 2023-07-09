<script setup lang="ts">
defineProps<{
	header: string;
}>();
</script>

<template lang="pug">
h2.py-3.flex.justify-center.items-center
	span.text-2xl.text-primary.text-center.text-uppercase {{ header }}
</template>
