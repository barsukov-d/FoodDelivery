import { mount, shallowMount } from '@vue/test-utils';

export const createComponentShallowMount = (
	component: any,
	dataProps?: any,
	global?: any
) => {
	return shallowMount(component, {
		props: dataProps,
		global: global,
	});
};
