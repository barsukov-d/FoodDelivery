import pick from 'lodash/pick';
import find from 'lodash/find';
import some from 'lodash/some';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

/**
 *
 * Сортировка массива
 *
 * @param {Record<string, any>[]} arr - Массив для сортировки
 * @param {string[]} sortBy - Ключ для сортировки
 * @param {Array<boolean | 'asc' | 'desc'> | undefined} sortDir - Порядок сортировки
 *
 * @example SortMockHelper([{ name:'foo' }, { name:'bar' }], ['name'], ['asc']);
 *
 */
export const SortMockHelper = (
	arr: Record<string, any>[],
	sortBy: string[],
	sortDir: Array<boolean | 'asc' | 'desc'> | undefined = ['asc']
) => orderBy(arr, sortBy, sortDir);

/**
 *
 * Поиск элемента в массиве
 *
 * @param {Record<string, any>[]} arr - Массив для поиска
 * @param {Record<string, any>} condition - Объект поиска
 *
 * @example FindMockHelper([{ name:'foo' }, { name:'bar' }], {'name': 'foo'});
 *
 */
export const FindMockHelper = (
	arr: Record<string, any>[],
	condition: Record<
		string,
		| string
		| number
		| boolean
		| string[]
		| number[]
		| Record<string, string | number | boolean | undefined>[]
		| undefined
	>
) => find(arr, condition);

/**
 *
 * Фильтрация массива
 *
 * @param {Record<string, any>[]} arr - Массив для фильтрации
 * @param {string} condition - Объект фильтрации
 *
 * @example FilterMockHelper([{ name: 'foo' }, { name: 'bar' }], { name: 'foo' });
 *
 */
export const FilterMockHelper = (
	arr: Record<string, any>[],
	condition: Record<
		string,
		| string
		| number
		| boolean
		| string[]
		| number[]
		| Record<string, string | number | boolean | undefined>[]
		| undefined
	>
) =>
	filter(arr, (item: Record<string, any>) =>
		Object.entries(condition).every(([key, value]) => {
			if (value === undefined) {
				return true;
			}

			if (Array.isArray(value)) {
				return value.length
					? value.some((element) => {
							if (typeof element !== 'object') {
								return Array.isArray(item[key])
									? item[key].includes(element)
									: Boolean(item?.[key] === element);
							}

							if (Array.isArray(item[key])) {
								return some(item[key], element);
							}

							return some([item[key]], element);
					  })
					: true;
			}

			return Boolean(item?.[key] === value);
		})
	);

/**
 *
 * Получить укороченный массив объектов
 *
 * @param {Record<string, any>[]} arr - Массив для фильтрации
 * @param {string[]} findBy - Массив ключей которые требуется оставить
 *
 * @example PickMockHelper([{ id:1, name: 'foo' }, { id:2 name: 'bar' }], ['id']);
 *
 */
export const PickMockHelper = (
	arr: Record<string, any>[] | Record<string, any> | undefined,
	keyParts: string[]
) =>
	arr && Array.isArray(arr)
		? arr.map((item) => pick(item, keyParts))
		: pick(arr, keyParts);
