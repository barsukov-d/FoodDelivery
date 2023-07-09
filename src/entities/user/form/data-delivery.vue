<script setup lang="ts">
const form = ref({
	phone: '',
	locality: '',
	street: '',
	building: '',
	floor: '',
	apartment: '',
	intercomCode: '',
});

const readonlyForm = ref<boolean>(true);

const onSubmit = () => {
	readonlyForm.value = !readonlyForm.value;
};
</script>

<template lang="pug">
q-form
	q-input(
		v-model='form.phone',
		label='Телефон',
		outlined,
		mask='+7-###-###-##-##',
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.locality',
		label='Населённый пункт',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.street',
		label='Улица',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input(
		v-model='form.building',
		label='Дом / строение',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Поле обязательно для заполнения"]'
	)
	q-input.mb-5(
		v-model='form.floor',
		label='Этаж',
		outlined,
		:readonly='readonlyForm'
	)
	q-input.mb-5(
		v-model='form.apartment',
		label='Квартира / оффис',
		outlined,
		:readonly='readonlyForm'
	)
	q-input.mb-5(
		v-model='form.intercomCode',
		label='Код домофона',
		outlined,
		:readonly='readonlyForm'
	)
	q-btn.ui-button(
		:label='readonlyForm === true ? "Редактировать данные" : "Сохранить данные"',
		@click='onSubmit',
		color='primary',
		outline,
		no-caps
	)
</template>
