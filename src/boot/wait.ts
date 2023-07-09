// @ts-ignore
import wait from '@meforma/vue-wait-for';
import { boot } from 'quasar/wrappers';

import type { InjectionKey } from 'vue';

declare class Wait {
	is(name: string | symbol): boolean;
	start(name: string | symbol): void;
	end(name: string | symbol): void;
	any(): boolean;
}

export const VueWaitKey: InjectionKey<Wait> = Symbol('wait');

export default boot(({ app }) => {
	app.use(wait).provide(VueWaitKey, app.config.globalProperties.$wait);
});
