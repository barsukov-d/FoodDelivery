enum SliderType {
	BANNER = 'banner',
	PRODUCT = 'product',
}

export interface ISlider {
	id: number;
	title: string;
	category_id: number;
	type: SliderType;
}
