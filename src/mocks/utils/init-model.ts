import { ImockDB } from '../libs/mock-db';

export default async function initModel(
	db: ImockDB,
	storeName: string,
	tables: Record<string, string>
): Promise<void> {
	await db.createObjectStore(storeName, Object.values(tables));

	const promises = Object.values(tables).map(async (name: string) => {
		await db.putFixture(
			storeName,
			name,
			(
				await import(`../modules/${storeName}/fixtures/${name}.json`)
			).default
		);
	});

	await Promise.all(promises);
}
