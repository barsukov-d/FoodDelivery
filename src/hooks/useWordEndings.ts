export const useWordEnding = (int: number, array: string[]): string => {
	return (
		(array = array || ['товар', 'товара', 'товаров']) &&
		array[
			int % 100 > 4 && int % 100 < 20
				? 2
				: [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
		]
	);
};
