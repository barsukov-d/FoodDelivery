import {
	SortMockHelper,
	FindMockHelper,
	FilterMockHelper,
	PickMockHelper,
} from './helpers';

interface ISortMockFixture {
	id: number;
	name: string;
}

interface ISortMockCases {
	name: string;
	reply: {
		sortBy: Array<string>;
		sortDir: Array<boolean | 'asc' | 'desc'> | undefined;
	};
	expected: ISortMockFixture[];
}

const SORT_MOCK_FIXTURE: ISortMockFixture[] = [
	{ id: 1, name: 'Вячеслав' },
	{ id: 2, name: 'Юрий' },
	{ id: 3, name: 'Александр' },
];

const SORT_MOCK_CASES: ISortMockCases[] = [
	{
		name: 'sort by id ASC',
		reply: {
			sortBy: ['id'],
			sortDir: ['asc'],
		},
		expected: [
			{ id: 1, name: 'Вячеслав' },
			{ id: 2, name: 'Юрий' },
			{ id: 3, name: 'Александр' },
		],
	},
	{
		name: 'sort by id DESC',
		reply: {
			sortBy: ['id'],
			sortDir: ['desc'],
		},
		expected: [
			{ id: 3, name: 'Александр' },
			{ id: 2, name: 'Юрий' },
			{ id: 1, name: 'Вячеслав' },
		],
	},
	{
		name: 'sort by name ASC',
		reply: {
			sortBy: ['name'],
			sortDir: ['asc'],
		},
		expected: [
			{ id: 3, name: 'Александр' },
			{ id: 1, name: 'Вячеслав' },
			{ id: 2, name: 'Юрий' },
		],
	},
	{
		name: 'sort by name DESC',
		reply: {
			sortBy: ['name'],
			sortDir: ['desc'],
		},
		expected: [
			{ id: 2, name: 'Юрий' },
			{ id: 1, name: 'Вячеслав' },
			{ id: 3, name: 'Александр' },
		],
	},
];

interface IFindMockFixture {
	id: number;
	name: string;
}

interface IFindMockCases {
	name: string;
	reply: {
		find: Record<
			string,
			| string
			| number
			| boolean
			| string[]
			| number[]
			| Record<string, string | number | boolean | undefined>[]
			| undefined
		>;
	};
	expected: IFindMockFixture | undefined;
}

const FIND_MOCK_FIXTURE: IFindMockFixture[] = [
	{ id: 1, name: 'Вячеслав' },
	{ id: 2, name: 'Юрий' },
	{ id: 3, name: 'Александр' },
];

const FIND_MOCK_CASES: IFindMockCases[] = [
	{
		name: 'find `3` by id',
		reply: {
			find: { id: 3 },
		},
		expected: FIND_MOCK_FIXTURE[2],
	},
	{
		name: 'find `Юрий` by name',
		reply: {
			find: { name: 'Юрий' },
		},
		expected: FIND_MOCK_FIXTURE[1],
	},
	{
		name: 'find `foo` by name',
		reply: {
			find: { name: 'foo' },
		},
		expected: undefined,
	},
];

interface IFilterMockFixture {
	id: number;
	name: string;
	site_id: number;
	brand: Record<string, string | number>;
	regions: Record<string, string | number>[];
}

interface IFilterMockCases {
	name: string;
	reply: {
		filter: Record<
			string,
			| string
			| number
			| boolean
			| string[]
			| number[]
			| Record<string, string | number | boolean | undefined>[]
			| undefined
		>;
	};
	expected: IFilterMockFixture[] | [] | undefined;
}

const FILTER_MOCK_FIXTURE: IFilterMockFixture[] = [
	{
		id: 1,
		name: 'foo',
		site_id: 1,
		brand: {
			id: 1,
			name: 'Sontelle',
		},
		regions: [
			{ id: 1, name: 'foo' },
			{ id: 2, name: 'bar' },
		],
	},
	{
		id: 2,
		name: 'foo',
		site_id: 1,
		brand: {
			id: 2,
			name: 'Ортомакс',
		},
		regions: [
			{ id: 1, name: 'foo' },
			{ id: 2, name: 'bar2' },
		],
	},
	{
		id: 3,
		name: 'bar',
		site_id: 1,
		brand: {
			id: 1,
			name: 'Sontelle',
		},
		regions: [
			{ id: 1, name: 'foo2' },
			{ id: 2, name: 'bar' },
		],
	},
];

const FILTER_MOCK_CASES: IFilterMockCases[] = [
	{
		name: 'filter by id=1',
		reply: {
			filter: { id: 1 },
		},
		expected: [FILTER_MOCK_FIXTURE[0]],
	},
	{
		name: 'filter by name=foo',
		reply: {
			filter: { name: 'foo' },
		},
		expected: [FILTER_MOCK_FIXTURE[0], FILTER_MOCK_FIXTURE[1]],
	},
	{
		name: 'filter by name=bar and site_id=1',
		reply: {
			filter: { name: 'bar', site_id: 1 },
		},
		expected: [FILTER_MOCK_FIXTURE[2]],
	},
	{
		name: 'filter by id=2 and name=foo and site_id=1',
		reply: {
			filter: { id: 2, name: 'foo', site_id: 1 },
		},
		expected: [FILTER_MOCK_FIXTURE[1]],
	},
	{
		name: 'filter empty',
		reply: {
			filter: {},
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter novalid',
		reply: {
			filter: { foo: 'bar' },
		},
		expected: [],
	},
	{
		name: 'filter id=undefined',
		reply: {
			filter: { id: undefined },
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter id=1 or id=2',
		reply: {
			filter: { id: [1, 2] },
		},
		expected: [FILTER_MOCK_FIXTURE[0], FILTER_MOCK_FIXTURE[1]],
	},
	{
		name: 'filter regions is empty array',
		reply: {
			filter: { regions: [] },
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter regions has {id=1 and name=foo}',
		reply: {
			filter: { regions: [{ id: 1, name: 'foo' }] },
		},
		expected: [FILTER_MOCK_FIXTURE[0], FILTER_MOCK_FIXTURE[1]],
	},
	{
		name: 'filter regions {id=1 and name=foo} or {id=2 and name=bar}',
		reply: {
			filter: {
				regions: [
					{ id: 1, name: 'foo' },
					{ id: 2, name: 'bar' },
				],
			},
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter {id=1} and {site_id=1} and regions {id=1 and name=foo} or {id=2 and name=bar}',
		reply: {
			filter: {
				id: 1,
				site_id: 1,
				regions: [{ id: 1, name: 'foo' }],
			},
		},
		expected: [FILTER_MOCK_FIXTURE[0]],
	},
	{
		name: 'filter brand {id=1}',
		reply: {
			filter: {
				brand: [{ id: 1 }],
			},
		},
		expected: [FILTER_MOCK_FIXTURE[0], FILTER_MOCK_FIXTURE[2]],
	},
	{
		name: 'filter brand {id=1} or {id=2}',
		reply: {
			filter: {
				brand: [{ id: 1 }, { id: 2 }],
			},
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter brand {id=1 and name=Sontelle}',
		reply: {
			filter: {
				brand: [{ id: 1, name: 'Sontelle' }],
			},
		},
		expected: [FILTER_MOCK_FIXTURE[0], FILTER_MOCK_FIXTURE[2]],
	},
	{
		name: 'filter brand {id=1} or {name=Sontelle}',
		reply: {
			filter: {
				brand: [{ id: 1 }, { name: 'Ортомакс' }],
			},
		},
		expected: FILTER_MOCK_FIXTURE,
	},
	{
		name: 'filter brand {id=undefined} or {name=Ортомакс}',
		reply: {
			filter: {
				brand: [{ id: undefined }, { name: 'Ортомакс' }],
			},
		},
		expected: [FILTER_MOCK_FIXTURE[1]],
	},
	{
		name: 'filter brand {id=undefined}',
		reply: {
			filter: {
				brand: [{ id: undefined }],
			},
		},
		expected: [],
	},
	{
		name: 'filter brand empty',
		reply: {
			filter: {
				brand: [{}],
			},
		},
		expected: FILTER_MOCK_FIXTURE,
	},
];
interface IPickMockFixture {
	id?: number;
	name?: string;
	site_id?: number;
}

interface IPickMockCases {
	name: string;
	reply: { keyParts: string[] };
	expected: IPickMockFixture[] | [] | undefined;
}

const PICK_MOCK_FIXTURE: IPickMockFixture[] = [
	{ id: 1, name: 'foo', site_id: 1 },
	{ id: 2, name: 'foo', site_id: 1 },
	{ id: 3, name: 'bar', site_id: 1 },
];

const PICK_MOCK_CASES: IPickMockCases[] = [
	{
		name: 'return empty objects',
		reply: {
			keyParts: [],
		},
		expected: [{}, {}, {}],
	},
	{
		name: 'return objects have id',
		reply: {
			keyParts: ['id'],
		},
		expected: [{ id: 1 }, { id: 2 }, { id: 3 }],
	},
	{
		name: 'return objects have id and name',
		reply: {
			keyParts: ['id', 'name'],
		},
		expected: [
			{ id: 1, name: 'foo' },
			{ id: 2, name: 'foo' },
			{ id: 3, name: 'bar' },
		],
	},
];

describe('service mock helpers', function () {
	it.each(SORT_MOCK_CASES)(
		'SortMockHelper cases - $name',
		async ({ reply: { sortBy, sortDir }, expected }) => {
			expect(SortMockHelper(SORT_MOCK_FIXTURE, sortBy, sortDir)).toEqual(
				expected
			);
		}
	);

	it.each(FIND_MOCK_CASES)(
		'FindMockHelper cases - $name',
		async ({ reply: { find }, expected }) => {
			expect(FindMockHelper(FIND_MOCK_FIXTURE, find)).toEqual(expected);
		}
	);

	it.each(FILTER_MOCK_CASES)(
		'FilterMockHelper cases - $name',
		async ({ reply: { filter }, expected }) => {
			expect(FilterMockHelper(FILTER_MOCK_FIXTURE, filter)).toEqual(
				expected
			);
		}
	);

	it.each(PICK_MOCK_CASES)(
		'PickMockHelper cases - $name',
		async ({ reply: { keyParts }, expected }) => {
			expect(PickMockHelper(PICK_MOCK_FIXTURE, keyParts)).toEqual(
				expected
			);
		}
	);

	it('PickMockHelper pick in object', async () => {
		expect(
			PickMockHelper({ id: 1, name: 'foo', domain: 1, list: [1, 2, 3] }, [
				'id',
				'name',
			])
		).toEqual({ id: 1, name: 'foo' });
	});
});
