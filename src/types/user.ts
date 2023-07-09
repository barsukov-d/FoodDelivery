export interface IUser {
	id: number;
	/** @example "Иван" */
	firstName: string;
	/** @example "Иванов" */
	secondName: string;
	/** @example "+7 (999) 999-99-99" */
	phoneNumber: string;
	/** @example "example@mail.com" */
	email?: string;
	/** @example "123456" */
	password: string;
	/** @example "0.1" */
	sale?: number;

	deliveryAddress: IDelivery;
}

export interface IDelivery {
	id: number;
	/** @example "Пекин" */
	locality: string;
	/** @example "Улица Пушкина" */
	street: string;
	/** @example "Дом 5" */
	building: string;
	/** @example "Этаж 5" */
	floor?: string;
	/** @example "Квартира 5" */
	apartment?: string;
	/** @example "Код 5253" */
	intercomCode?: string;
	/** @example "Комментарий" */
	comment?: string;
}

export interface IOrder {
	id: number;
	/** @example 236598 */
	order_number?: number;
	/** @example "Ожидает оплаты, Оплачен, Отменён" */
	payment_status?: 'waiting payment' | 'paid' | 'canceled';
	/** @example "Готовится, Ожидает отгрузки, Доставляется, Завершён, Отменён" */
	'order status'?:
		| 'cooking'
		| 'waiting shipment'
		| 'delivering'
		| 'completed'
		| 'canceled';
	/** @example "самовывоз, доставка" */
	type_of_shipping?: 'pickup' | 'delivery';
	/** @example "Пекин Улица Пушкина Дом 5 Этаж 5 Квартира 5" */
	address?: string;
	/** @example 79999999999 */
	phoneNumber?: number;
	/** @example "Хинкали, Суп, Салат, Напиток" */
	order_entry?: string;
	/** @example 1000 */
	order_price?: number;
}

export interface IRegistrationUser {
	firstName: string;
	secondName: string;
	phoneNumber: string;
	email: string;
	password: string;
	repeatPassword: string;
}

export interface IFormRegUser {
	firstName: string;
	secondName: string;
	phoneNumber: string;
	password: string;
	repeatPassword?: string;
}

export interface IFormDataUser {
	firstName: string;
	secondName: string;
	phoneNumber: string;
}

export interface IFormLoginUser {
	phoneNumber: string;
	password: string;
}

export interface IResUser {
	status: number;
	message: string;
	jwt: string;
	userNew: IUser;
}

export interface IFormOrder {
	phoneNumber: string;
	locality: string;
	street: string;
	building: string;
	floor?: string;
	apartment?: string;
	intercomCode?: string;
	comment?: string;
}

export interface ILang {
	value: string;
	label: string;
}

export interface IModeTeme {
	value: string | boolean;
	label: string;
}
