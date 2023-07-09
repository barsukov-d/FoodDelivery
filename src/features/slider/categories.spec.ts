import { describe, it, expect } from 'vitest';

import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { shallowMount } from '@vue/test-utils';
import SliderCategories from './categories.vue';

// import { useRouter, useRoute } from 'vue-router';

/*
 * You can provide a config object as param like such:
 *
 * ```ts
 * installQuasarPlugin({ plugins: { Dialog } });
 * ```
 */
installQuasar();

vi.mock('vue-router', () => {
	// return {
	// 	useRoute: vi.fn(),

	// 	useRouter: vi.fn(() => ({
	// 		push: () => {},
	// 	})),
	// };

	const useRouter = vi.fn();
	const useRoute = vi.fn(() => ({
		params: {
			id: '2',
		},
	}));

	return {
		useRouter,
		useRoute,
	};
});
useRoute;

vi.mock('src/hooks/useWait', () => {
	return {
		useWait: vi.fn(() => ({
			is: vi.fn(() => false),
		})),
	};
});

vi.mock('src/hooks/useCategories', () => {
	return {
		useCategories: vi.fn(() => ({
			categories: [
				{
					id: 1,
					title: 'test',
					image: 'test',
					alias: 'test',
				},
				{
					id: 2,
					title: 'test',
					image: 'test',
					alias: 'test',
				},
			],
			fetchCategories: vi.fn(() => Promise.resolve()),
		})),
	};
});

describe('Slider categories cards', () => {
	let wrapper: any;

	const createComponent = () => {
		wrapper = shallowMount(SliderCategories, {});
	};

	it('show slider skeletons while loading', async () => {
		useRoute.mockReturnValue({
			params: {
				id: '4',
			},
		});

		createComponent();

		expect(wrapper.find('.skeleton').exists()).toBe(true);
		console.log(wrapper.find('.test-1').html(), 'wrapper.find(.skeleton)');
	});
});
