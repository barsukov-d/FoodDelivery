<script setup lang="ts">
import type { IFormLoginUser } from 'src/types/user';
const emit = defineEmits<{
	(e: 'handleLoginUser', form: IFormLoginUser): void;
}>();

const form = ref({
	phoneNumber: '',
	password: '',
});

const onSubmit = () => {
	emit('handleLoginUser', form.value);
};
</script>

<template lang="pug">
h2.text-center.font-bold Вход
form(@submit.prevent='onSubmit')
	q-input(
		outlined,
		label='Номер телефона',
		v-model='form.phoneNumber',
		:rules='[(val) => (val && val.length > 0) || "Поле обязательно для заполнения"]',
		mask='+#-###-###-##-##'
	)
	q-input(
		outlined,
		label='Пароль',
		v-model='form.password',
		:rules='[(val) => (val && val.length > 0) || "Поле обязательно для заполнения"]',
		type='password',
		maxlength=9
	)
	q-btn.ui-button.mx-0.mt-5.w-full(
		label='Войти',
		color='primary',
		@click='onSubmit',
		:disabled='!form.phoneNumber || !form.password'
	)
	q-btn.ui-button.mt-5.w-full(
		:to='{ name: "registration" }',
		label='Зарегистрироваться',
		outline,
		color='primary'
	)
</template>
