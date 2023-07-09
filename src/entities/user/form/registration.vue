<script setup lang="ts">
import type { IFormRegUser } from 'src/types/user';

const emit = defineEmits<{
	(e: 'HandleRegUser', form: IFormRegUser): void;
}>();

const form = ref<IFormRegUser>({
	firstName: '',
	secondName: '',
	phoneNumber: '',
	password: '',
	repeatPassword: '',
});

const onSubmit = (): void => {
	emit('HandleRegUser', form.value);
};
</script>

<template lang="pug">
h2.text-center Регистрация
q-form(@submit='onSubmit')
	q-input(
		v-model='form.firstName',
		label='Имя',
		outlined,
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.secondName',
		label='Фамилия',
		outlined,
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.phoneNumber',
		label='Телефон',
		outlined,
		mask='+#-###-###-##-##',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.password',
		label='Пароль',
		outlined,
		type='password',
		maxlength='9',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.repeatPassword',
		label='Повторите пароль',
		outlined,
		type='password',
		maxlength='9',
		:rules='[(val) => !!val || "Поле обязательно для заполнения", (val) => val === form.password || "Пароли не совпадают"]'
	)
	q-btn.ui-button(
		label='Зарегистрироваться',
		type='submit',
		color='primary',
		outline,
		no-caps
	)
</template>
