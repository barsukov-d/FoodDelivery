<script setup lang="ts">
import type { IFormDataUser } from 'src/types/user';

const props = defineProps<{
	user: IFormDataUser;
}>();

onMounted(() => {
	form.value = props.user;
});

const form = ref<IFormDataUser>({
	firstName: '',
	secondName: '',
	phoneNumber: '',
});

const onSubmit = (): void => {
	// emit('HandleRegUser', form.value);
	// console.log('onSubmit', form.value);
	readonlyForm.value = !readonlyForm.value;
};

const readonlyForm = ref<boolean>(true);
</script>

<template lang="pug">
form(@submit.prevent='onSubmit')
	q-input(
		v-model='form.firstName',
		label='First name',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Name is required"]'
	)
	q-input(
		v-model='form.secondName',
		label='Second name',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Name is required"]'
	)
	q-input(
		v-model='form.phoneNumber',
		label='Phone number',
		outlined,
		:readonly='readonlyForm',
		:rules='[(val) => !!val || "Phone number is required"]'
	)

	q-btn.ui-button(
		:label='readonlyForm === true ? "Редактировать данные" : "Сохранить данные"',
		type='submit',
		color='primary',
		outline,
		no-caps
	)
</template>
