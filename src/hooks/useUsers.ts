import { usersService } from 'src/services/users';
import type { IUser } from 'src/types/user';
import type {
	IFormRegUser,
	IResUser,
	IFormLoginUser,
	IFormOrder,
} from 'src/types/user';

export const useUsers = () => {
	const $w = useWait();

	/**
	 *
	 * Fetch users
	 *
	 */

	const users = ref<IUser[]>([]);
	const fetchUsersLoadingSymbol = Symbol('fetchUsers');
	const getUsers = async () => {
		try {
			$w.start(fetchUsersLoadingSymbol);
			users.value = await usersService.getUsers();
		} catch (error) {
			throw error;
		} finally {
			$w.end(fetchUsersLoadingSymbol);
		}
	};

	const regUser = ref<IResUser>();
	const registrationUserLoadingSymbol = Symbol('registrationUser');
	const registrationUser = async (data: IFormRegUser) => {
		try {
			$w.start(registrationUserLoadingSymbol);
			regUser.value = await usersService.registrationUser(data);
		} catch (error) {
			throw error;
		} finally {
			$w.end(registrationUserLoadingSymbol);
		}
	};

	const loginUser = ref<any>();
	const loginUserLoadingSymbol = Symbol('loginUser');
	const fetchLoginUser = async (data: IFormLoginUser) => {
		try {
			$w.start(loginUserLoadingSymbol);
			loginUser.value = await usersService.loginUser(data);
		} catch (error) {
			throw error;
		} finally {
			$w.end(loginUserLoadingSymbol);
		}
	};

	const logoutUser = ref<any>();
	const logoutUserLoadingSymbol = Symbol('logoutUser');
	const fetchLogoutUser = async () => {
		try {
			$w.start(logoutUserLoadingSymbol);
			logoutUser.value = await usersService.logoutUser();
		} catch (error) {
			throw error;
		} finally {
			$w.end(logoutUserLoadingSymbol);
		}
	};

	const userOrder = ref<any>();
	const userOrderLoadingSymbol = Symbol('userOrder');
	const fetchUserOrder = async (data: IFormOrder, id: string) => {
		try {
			$w.start(userOrderLoadingSymbol);
			userOrder.value = await usersService.userOrder(data, id);
		} catch (error) {
			throw error;
		} finally {
			$w.end(userOrderLoadingSymbol);
		}
	};

	// const banner = ref<IUser>();
	// const getBannerLoadingSymbol = Symbol('getBanner');
	// const getBanner = async (id: number) => {
	// 	try {
	// 		$w.start(getBannerLoadingSymbol);
	// 		banner.value = await usersService.getUsers();
	// 	} catch (error) {
	// 		throw error;
	// 	} finally {
	// 		$w.end(getBannerLoadingSymbol);
	// 	}
	// };
	// const fetchBanners = async (): Promise<void> => {
	// 	$w.start('fetchBanners');
	// 	try {
	// 		_banners.value = await bannersService.getBanners();
	// 	} catch (error) {
	// 		if (error instanceof bannersServiceErrors.ErrorNotFoundBanners) {
	// 			bannersError.value = 'Я вернул 404';
	// 		} else if (
	// 			error instanceof bannersServiceErrors.ErrorBadRequestBanners
	// 		) {
	// 			bannersError.value = 'Я вернул 400';
	// 		} else {
	// 			throw error;
	// 		}
	// 	} finally {
	// 		$w.end('fetchBanners');
	// 	}
	// };

	return {
		users,
		fetchUsersLoadingSymbol,
		getUsers,
		regUser,
		registrationUserLoadingSymbol,
		registrationUser,
		loginUser,
		loginUserLoadingSymbol,
		fetchLoginUser,
		logoutUser,
		logoutUserLoadingSymbol,
		fetchLogoutUser,
		userOrder,
		userOrderLoadingSymbol,
		fetchUserOrder,
	};
};
