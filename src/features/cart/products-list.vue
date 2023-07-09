<script setup lang="ts">
import CartProductCard from 'src/entities/cart/product-card.vue';
import { useCartStore } from 'stores/cart';
import { useCartProductsList } from 'src/hooks/useCartProductsList';

const cartStore = useCartStore();
const $q = useQuasar();

const { productsList, fetchProductsList } = useCartProductsList();

const removeProduct = (id: number) => {
	showDialogRemoveProduct(id);
};

const addProduct = (id: number) => {
	cartStore.addProduct(id);
};

const decProduct = (id: number) => {
	cartStore.decProduct(id);
};

const count = (id: number, val: number) => {
	val <= 0 ? showDialogRemoveProduct(id) : cartStore.setProductCount(id, val);
};

const showDialogRemoveProduct = (id: number) => {
	$q.dialog({
		title: 'Внимание',
		message: 'Вы хотите удалить продукт ?',
		persistent: true,
		ok: 'Подтвердить',
		cancel: 'Отмена',
	})
		.onOk(() => {
			cartStore.removeProduct(id);
		})
		.onCancel(() => {
			// console.log('Cancel')
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
};

fetchProductsList();
</script>
<template lang="pug">
//- pre {{ productsList }}
template(v-if='productsList.length')
	TransitionGroup(tag='ul', name='fade')
		CartProductCard(
			v-for='product in productsList',
			:key='product.id',
			:product='product',
			@removeProduct='removeProduct',
			@addProduct='addProduct',
			@decProduct='decProduct'
		)
h3.text-2xl.text-center(v-else) Корзина пуста
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(250px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
	position: absolute;
}
</style>
