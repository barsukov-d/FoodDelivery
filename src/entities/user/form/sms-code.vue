<script setup lang="ts">
const form = ref({
	smsCode: '',
});

const onSubmit = () => {
	// console.log('login', form.value);
};
</script>

<template lang="pug">
h2.text-center Введите код из смс

form(@submit.prevent='onSubmit')
	q-input(
		v-model='form.smsCode',
		label='Name',
		outlined,
		:rules='[(val) => !!val || "Name is required"]'
	)

	q-btn.ui-button(
		label='Sign in',
		type='submit',
		color='primary',
		outline,
		no-caps
	)
</template>
