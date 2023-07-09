type TProductBaiges = 'new' | 'popular' | 'hot' | 'sale';

export interface IProductCartID {
	id: number[];
}

export interface IProduct {
	id: number;
	category_id: number;
	name: string;
	description?: string;
	price: number;
	image: string;
	weight: number;
	baiges?: TProductBaiges[];
	kcal?: number;
	count: number;
}

export interface IProductCart {
	id: number;
	count: number;
}

export interface IProductCartList extends IProduct {
	count: IProductCart['count'];
}
