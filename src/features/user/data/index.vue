<script setup lang="ts">
import { useUserStore } from 'src/stores/user';
import { useUsers } from 'src/hooks/useUsers';

import FormDataUser from 'src/entities/user/form/data-user.vue';
import FormDataDelivery from 'src/entities/user/form/data-delivery.vue';

const userStore = useUserStore();
const { fetchLogoutUser, logoutUser } = useUsers();

const user = computed(() => {
	return userStore.user;
});

const tab = ref('main');

const $q = useQuasar();
const router = useRouter();

const logoutDialog = () => {
	// router.push({ name: 'cart' });
	$q.dialog({
		title: 'Внимание',
		message: 'Вы действительно хотите выйти?',
		ok: 'Да',
		cancel: 'Отмена',
	})
		.onOk(() => {
			fetchLogoutUser();
		})
		.onCancel(() => {
			// console.log('Cancel')
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
};

watch(
	() => logoutUser.value,
	(newValue, oldValue) => {
		if (newValue.status === 0) {
			userStore.resetState();
			router.push({ name: 'login' });
			// $q.notify({
			// 	message: 'Вы вышли из аккаунта',
			// 	type: 'positive',
			// 	position: 'top',
			// });
		}
	}
);
</script>
<template lang="pug">
h2.text-center.font-bold Добро пожаловать, {{ user.firstName }}
q-tabs.mb-5.bg-primary.text-white.shadow-2(
	v-model='tab',
	no-caps,
	outside-arrows,
	mobile-arrows
)
	q-tab(name='main', label='Основные')
	q-tab(name='delivery', label='Доставка')
	q-tab(name='orders', label='Заказы')

FormDataUser(v-if='tab === "main"', :user='user')
FormDataDelivery(v-if='tab === "delivery"', :user='user')
.text-center(v-if='tab === "orders"')
	| Здесь будут ваши заказы

q-btn.ui-button.mt-5(color='primary', label='Выход', @click='logoutDialog')
</template>
