import { describe, it, expect } from 'vitest';

// import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { shallowMount } from '@vue/test-utils';
import CategoryCard from './card.vue';

/*
 * You can provide a config object as param like such:
 *
 * ```ts
 * installQuasarPlugin({ plugins: { Dialog } });
 * ```
 */
// installQuasar();

describe('Category card', () => {
	let wrapper: any;

	const DEFAULT_PROPS = {
		category: {
			id: 1,
			title: 'test',
			image: 'test',
			alias: 'test',
		},
		activeCategoryNumber: 1,
		newProps: {
			id: 1,
			title: 'test',
			image: 'test',
		},
	};

	const createComponent = (props?: any) => {
		wrapper = shallowMount(CategoryCard, {
			props: { ...DEFAULT_PROPS, ...props },
		});
	};

	it('show title', async () => {
		createComponent();
		expect(wrapper.find('h3').text()).toContain(
			DEFAULT_PROPS.category.title
		);
	});

	it('check active class background', async () => {
		createComponent();
		expect(wrapper.find('.bg-primary').exists()).toBe(true);
	});

	it('check not active class background', async () => {
		const props = {
			category: {
				id: 2,
			},
		};

		createComponent(props);
		expect(wrapper.find('.bg-primary').exists()).toBe(false);
	});

	it('check active class text', async () => {
		createComponent();
		expect(wrapper.find('.text-white').exists()).toBe(true);
	});

	it('check not active class text', async () => {
		const props = {
			category: {
				id: 2,
			},
		};

		createComponent(props);
		expect(wrapper.find('.text-white').exists()).toBe(false);
	});

	it('emit event toCategory', async () => {
		createComponent();
		wrapper.find('h3').trigger('click');
		const toCategoryEvent = wrapper.emitted('toCategory');

		expect(toCategoryEvent).toHaveLength(1);
		expect(toCategoryEvent![0]).toEqual([DEFAULT_PROPS.category.id]);

		console.log(wrapper.vm.props, 'wrapper.vm.props');
	});
});
