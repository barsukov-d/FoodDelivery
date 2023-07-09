import { IDBPDatabase, openDB, deleteDB } from 'idb';
import consola, { type Consola, LogLevel } from 'consola';

/**
 *
 * mockDB constructor
 *
 */
export interface IMockDBConstructor {
	level?: number;
	freezeState?: boolean;
}

export interface ImockDB {
	instance?: ImockDB;

	/**
	 *
	 * Создать хранилище
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string[]} tableNames - Имена таблиц
	 *
	 * @example mockDB.createObjectStore('dbName', ['table1', 'table2']);
	 *
	 */
	createObjectStore(dbName: string, tableNames: string[]): Promise<void>;

	/**
	 *
	 * Загрузить фикстуры
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 * @param {Record<string, string>} values - Сожержимое элементов
	 *
	 * @example mockDB.putFixture('dbName', 'table1', [{id:1, foo:'bar'}, {id:2, foo:'bar2'}]);
	 *
	 */
	putFixture(
		dbName: string,
		tableName: string,
		values: Record<string, string>[]
	): Promise<void[]>;

	/**
	 *
	 * Получить содержимое элемента таблицы по id
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 * @param {number} id - id эелмента
	 *
	 * @example mockDB.get('dbName', 'table1', 1);
	 *
	 */
	get(dbName: string, tableName: string, id: number): Promise<any>;

	/**
	 *
	 * Получить содержимое всей таблицы
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 *
	 * @example mockDB.getAll('dbName', 'table1');
	 *
	 */
	getAll(dbName: string, tableName: string): Promise<any>;

	/**
	 *
	 * Добавить новый или изменить существующий элемент в таблице
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 * @param {Record<string, string>} value - Сожержимое элемента
	 *
	 * @example mockDB.put('dbName', 'table1', {id:1, foo:'bar'});
	 *
	 */
	put(
		dbName: string,
		tableName: string,
		value: Record<string, any>
	): Promise<number>;

	/**
	 *
	 * Добавить новые или изменить существующие элементы в таблице
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 * @param {Record<string, string>} values - Сожержимое элементов
	 *
	 * @example mockDB.putBulk('dbName', 'table1', [{id:1, foo:'bar'}, {id:2, foo:'bar2'}]);
	 *
	 */
	putBulk(
		dbName: string,
		tableName: string,
		values: Record<string, string>[]
	): Promise<void[]>;

	/**
	 *
	 * Удалить элемент из таблицы
	 *
	 * @param {string} dbName - Имя базы
	 * @param {string} tableName - Имя таблицы
	 * @param {number} id - id эелмента
	 *
	 * @example mockDB.delete('dbName', 'table1', 1);
	 *
	 */
	delete(dbName: string, tableName: string, id: number): void;
}

export class mockDB implements ImockDB {
	static instance: mockDB;
	private level = Infinity;
	private logger: Consola;
	private freezeState = false;

	constructor(config: IMockDBConstructor = {}) {
		if (config?.level !== undefined) {
			this.level = config.level;
		}
		if (config?.freezeState !== undefined) {
			this.freezeState = config.freezeState;
		}
		this.logger = consola.withDefaults({
			tag: 'mockDB',
			level: this.level ? LogLevel.Debug : LogLevel.Info,
		});

		if (mockDB.instance) {
			return mockDB.instance;
		}

		mockDB.instance = this;
	}

	public async createObjectStore(dbName: string, tableNames: string[]) {
		await deleteDB(dbName);
		await openDB(dbName, 1, {
			upgrade(db: IDBPDatabase) {
				for (const tableName of tableNames) {
					if (db.objectStoreNames.contains(tableName)) {
						continue;
					}
					db.createObjectStore(tableName, {
						autoIncrement: true,
						keyPath: 'id',
					});
				}
			},
		});
	}

	public async putFixture(
		dbName: string,
		tableName: string,
		values: Record<string, string>[]
	) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		for (const value of values) {
			const result = await store.put(value);

			this.logger.debug({
				message: 'Method putFixture',
				args: [result],
			});
		}
		return this.getAll(dbName, tableName);
	}

	public async get(dbName: string, tableName: string, id: number) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readonly');
		const store = transaction.objectStore(tableName);
		const result = await store.get(id);

		this.logger.debug({
			message: 'Method get',
			args: [result],
		});

		return result;
	}

	public async getAll(dbName: string, tableName: string) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readonly');
		const store = transaction.objectStore(tableName);
		const result = await store.getAll();

		this.logger.debug({
			message: 'Method getAll',
			args: [result],
		});

		return result;
	}

	public async put(
		dbName: string,
		tableName: string,
		value: Record<string, any>
	) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		const result = !this.freezeState
			? await store.put(value)
			: (await store.count()) + 1;

		this.logger.debug({
			message: 'Method put',
			args: [result],
		});

		return Number(result);
	}

	public async putBulk(
		dbName: string,
		tableName: string,
		values: Record<string, string>[]
	) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		for (const value of values) {
			const result = !this.freezeState ? await store.put(value) : value;

			this.logger.debug({
				message: 'Method putBulk',
				args: [result],
			});
		}
		return this.getAll(dbName, tableName);
	}

	public async delete(dbName: string, tableName: string, id: number) {
		const db = await openDB(dbName, 1);
		const transaction = db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		const result = await store.get(id);
		if (!result) {
			this.logger.debug({
				message: 'Method delete: Id not found',
				args: [id],
			});
			return result;
		}
		if (!this.freezeState) {
			await store.delete(id);
		}
		this.logger.debug({
			message: 'Method delete: Deleted Data',
			args: [id],
		});
		return id;
	}
}
