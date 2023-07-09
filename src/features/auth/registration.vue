<script setup lang="ts">
import FormReg from 'src/entities/user/form/registration.vue';
import { useUsers } from 'src/hooks/useUsers';
import { useUserStore } from 'src/stores/user';

const $q = useQuasar();

const { registrationUser, regUser } = useUsers();
const HandleRegUser = (form: any) => {
	registrationUser(form);
};

const router = useRouter();
const userStore = useUserStore();

const toProfile = () => {
	if (typeof regUser.value !== 'undefined') {
		userStore.jwt = regUser.value.jwt;
		userStore.user = regUser.value.userNew;
	}
	router.push({ name: 'profile' });
};

watch(
	() => regUser.value,
	(newValue) => {
		if (newValue) {
			console.log('newValue', newValue);

			newValue.status === 0 ? showDialogSuccessRegistration() : null;
		}
	},
	{ immediate: true }
);

const showDialogSuccessRegistration = () => {
	$q.dialog({
		title: 'Внимание',
		message: 'Вы успешно зарегистрировались',
		persistent: true,
		ok: 'Ок',
	})
		.onOk(() => {
			toProfile();
		})
		.onCancel(() => {
			// console.log('Cancel')
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
};
</script>
<template lang="pug">
FormReg(@HandleRegUser='HandleRegUser')
</template>
