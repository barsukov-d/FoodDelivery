<script setup lang="ts">
import PageHeader from 'src/shared/page/header.vue';
import FormOrder from 'src/entities/cart/form/order.vue';

import { useCartStore } from 'src/stores/cart';
import { useUserStore } from 'src/stores/user';
import { useRouter } from 'vue-router';
import { useUsers } from 'src/hooks/useUsers';
import { useStorage } from '@vueuse/core';
import type { IFormOrder } from 'src/types/user';

const $q = useQuasar();
const { t } = useI18n();
const router = useRouter();
const productsCartStore = useCartStore();
const userStore = useUserStore();
const { fetchUserOrder } = useUsers();

const form = ref({
	phoneNumber: '',
	locality: '',
	street: '',
	building: '',
	floor: '',
	apartment: '',
	intercomCode: '',
	comment: '',
});

const submitForm = () => {
	showDialog();
};

const showDialog = () => {
	$q.dialog({
		title: 'Успех',
		message: 'Ваш заказ успешно оформлен',
		ok: 'Ясно',
	})
		.onOk(() => {
			fetchUserOrder(form.value, userStore?.user?.id?.toString());
			productsCartStore.clearCart();
			// router.push({ name: 'home' });
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
PageHeader(:header='t("order.formHeader")')
FormOrder(@submitForm='submitForm', v-model='form')
</template>
