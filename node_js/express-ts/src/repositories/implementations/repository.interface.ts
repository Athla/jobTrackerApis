export interface Repository<T> {
	findAll(): Promise<T[]>
	findById(): Promise<T | null>
	create(item: T): Promise<T | null>
	update(id: number, item: T): Promise<T | null>
	delete(id: number): Promise<boolean>
}
