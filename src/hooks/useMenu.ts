import { useCartStore } from 'src/stores/cart';

export const useMenu = () => {
	const productsCartStore = useCartStore();
	const { t, locale } = useI18n();

	const router = useRouter();
	const route = useRoute();

	const tab = ref('home');

	const toPage = (page: string) => {
		if (page === 'home') {
			router.push('/');
		} else if (page === 'category') {
			router.push('/category/1');
		} else if (page === 'account') {
			router.push('/account');
		} else if (page === 'cart') {
			router.push('/cart');
		}
	};

	const tabs = ref([
		{
			name: 'home',
			icon: 'home',
			label: t('menuMobile.home'),
			badge: 0,
		},
		{
			name: 'category',
			icon: 'restaurant',
			label: t('menuMobile.dishes'),
			badge: 0,
		},
		{
			name: 'account',
			icon: 'person',
			label: t('menuMobile.user'),
			badge: 0,
		},
		{
			name: 'cart',
			icon: 'shopping_cart',
			label: t('menuMobile.cart'),
			badge: computed(() => productsCartStore.totalProducts),
		},
	]);

	const updatedMenu = () => {
		tabs.value.map((item) => {
			if (item.name === 'home') {
				item.label = t('menuMobile.home');
			} else if (item.name === 'category') {
				item.label = t('menuMobile.dishes');
			} else if (item.name === 'account') {
				item.label = t('menuMobile.user');
			} else if (item.name === 'cart') {
				item.label = t('menuMobile.cart');
			}
		});
	};

	watch(
		() => tab.value,
		() => {
			toPage(tab.value);
		}
	);

	watch(
		() => locale.value,
		() => {
			updatedMenu();
		}
	);

	onMounted(() => {
		route.meta.alias === 'home' && (tab.value = 'home');
		route.meta.alias === 'category' && (tab.value = 'category');
		route.meta.alias === 'account' && (tab.value = 'account');
		route.meta.alias === 'cart' && (tab.value = 'cart');
	});

	return {
		tabs,
		tab,
	};
};
