<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import type { IFormOrder } from 'src/types/user';

const props = defineProps<{
	modelValue: IFormOrder;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: IFormOrder): void;
	(e: 'submitForm'): void;
}>();

const formCart = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
});
</script>

<template lang="pug">
q-form(@submit='emit("submitForm")')
	q-input(
		v-model='formCart.phoneNumber',
		label='Телефон',
		outlined,
		mask='+#-###-###-##-##',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='formCart.locality',
		label='Населённый пункт',
		outlined,
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='formCart.street',
		label='Улица',
		outlined,
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='formCart.building',
		label='Дом / строение',
		outlined,
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input.mb-5(v-model='formCart.floor', label='Этаж', outlined)
	q-input.mb-5(v-model='formCart.apartment', label='Квартира / оффис', outlined)
	q-input.mb-5(v-model='formCart.intercomCode', label='Код домофона', outlined)
	q-input.mb-5(v-model='formCart.comment', label='Комментарий', outlined)
	q-btn.ui-button.mx-0.mt-5.w-full(
		type='submit',
		color='primary',
		label='Оформить заказ'
	)
</template>
