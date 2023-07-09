import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { IUser } from 'src/types/user';

export const useUserStore = defineStore('user', {
	state: () => ({
		jwt: useStorage('jwt', ''),
		user: useStorage('user', {} as IUser),
	}),

	getters: {},
	actions: {
		resetState() {
			this.jwt = '';
			this.user = {} as IUser;
		},
	},
});
