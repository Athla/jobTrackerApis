import { Database } from 'sqlite3'
import { Repository } from "../implementations/repository.interface";

export abstract class BaseRepository<T> implements Repository<T> {
	protected db: Database
	protected tableName: string

	constructor(db: Database, tableName: string) {
		this.db = db
		this.tableName = tableName
	}

	abstract findAll(): Promise<T[]>;
	abstract findById(id: number): Promise<T>;
	abstract create(item: T): Promise<T>;
	abstract update(id: number, item: T): Promise<T>;
	abstract delete(id: number): Promise<boolean>;
}
