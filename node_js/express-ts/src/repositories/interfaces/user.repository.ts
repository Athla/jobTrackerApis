import { User } from "../../models/user.model";
import { Database } from "sqlite3";
import { BaseRepository } from "./base.repository";
import { UserRepository as IUserRepository } from "../interfaces/user.repository";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
	constructor(db: Database) {
		super(db, 'users')
	}

	async findAll(): Promise<User[]> {
		return new Promise<User[]>((resolve, reject) => {
			this.db.all(
				'SELECT id, username, email, created_at, updated_at FROM users',
				(err, rows: User[]) => {
					if (err) {
						reject(new Error(`Failed to fetch users: ${err.message}`));
						return;
					}

					try {
						const users = rows.map(row => ({
							id: row.id,
							username: row.username,
							email: row.email,
							createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
							updateAt: row.updateAt ? new Date(row.updateAt) : undefined
						}));
						resolve(users);
					} catch (error) {
						reject(new Error(`Failed to process users: ${error.message}`));
					}
				}
			);
		});
	}

	async findById(id: number): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row: User) => {
				if (err) {
					reject(err)
				} else {
					if (row) {
						const user: User = {
							id: row.id,
							username: row.username,
							email: row.email,
							createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
							updateAt: row.updateAt ? new Date(row.updateAt) : undefined
						}
						resolve(user)
					}
				}
			})
		})
	}

	async findByEmail(email: string): Promise<User | null> {
		return new Promise<User | null>((resolve, reject) => {
			this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row: User) => {
				if (err) {
					reject(err)
				} else {
					if (row) {
						const user: User = {
							id: row.id,
							username: row.username,
							email: row.email,
							createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
							updateAt: row.updateAt ? new Date(row.updateAt) : undefined
						}
						resolve(user)
					} else {
						resolve(null)
					}
				}
			})
		})
	}

	async create(user: User): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			const now = new Date()
			this.db.run(
				'INSERT INTO users (username, email, created_at, updated_at) VALUES (?, ?, ?, ?)',
				[user.username, user.email, now, now],
				function(err) {
					if (err) {
						reject(err)
					} else {
						resolve({
							...user,
							id: this.lastID,
							createdAt: now,
							updateAt: now
						})
					}
				}
			)
		})
	}

	async update(id: number, user: User): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			const now = new Date();
			this.db.run(
				'UPDATE users SET username = ?, email = ?, updated_at = ? WHERE id = ?',
				[user.username, user.email, now, id],
				(err) => {
					if (err) {
						reject(err);
					} else {
						this.findById(id).then(resolve).catch(reject);
					}
				}
			);
		});
	}

	async delete(id: number): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
				if (err) {
					reject(err);
				} else {
					resolve(this.changes > 0);
				}
			});

		});
	}
}
