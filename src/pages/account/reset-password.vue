<script setup lang="ts">
const form = ref({
	phone: '',
});

const login = () => {
	// console.log('login', form.value);
};
</script>

<template lang="pug">
h2.text-center.font-bold Вход
form
	q-input(
		outlined,
		label='Номер телефона',
		v-model='form.phone',
		:rules='[(val) => (val && val.length > 0) || "Поле обязательно для заполнения"]'
	)

	q-btn.ui-button.mx-0.mt-5.w-full(
		label='Восстановить пароль',
		color='primary',
		@click='login',
		:disable='!form.phone'
	)
</template>
