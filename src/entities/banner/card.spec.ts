import { describe, it, expect, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import Card from './card.vue';

describe('Card', () => {
	let wrapper: any;

	const createComponent = (props?: any) => {
		wrapper = shallowMount(Card, {
			props: props,

			slots: {
				warning: 'hello',
			},
		});
	};

	it('show image in html', async () => {
		const banner = {
			id: 1,
			name: 'test',
			text: 'test',
			image: 'https://picsum.photos/200/300',
		};

		createComponent({ banner });

		await nextTick();

		expect(wrapper.findComponent('q-img-stub').props('src')).toBe(
			banner.image
		);
	});
});
