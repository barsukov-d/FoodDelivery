<script setup lang="ts">
import { useUsers } from 'src/hooks/useUsers';
import type { IFormLoginUser } from 'src/types/user';
import { useUserStore } from 'src/stores/user';
import Login from 'src/entities/user/form/login.vue';

const { loginUser, fetchLoginUser } = useUsers();

const userStore = useUserStore();
const login = (form: IFormLoginUser) => {
	fetchLoginUser(form);
};

const router = useRouter();
const $q = useQuasar();

const successLogin = () => {
	userStore.jwt = loginUser.value.jwt;
	userStore.user = loginUser.value.user;
	router.push({ name: 'profile' });
	// $q.notify({
	// 	message: 'Выполнен вход в аккаунт',
	// 	type: 'positive',
	// 	position: 'top',
	// });
};

const errorLogin = () => {
	$q.dialog({
		title: 'Ошибка',
		message: 'Неверный логин или пароль',
	});
};

watch(
	() => loginUser.value,
	(newValue) => {
		if (newValue) {
			newValue.status === 0 ? successLogin() : null;
			newValue.status === 10 ? errorLogin() : null;
		}
	},
	{ immediate: true }
);
</script>
<template lang="pug">
Login(@handle-login-user='login($event)')
</template>
