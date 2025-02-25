import { User } from "../../models/user.model";
import { BaseRepository } from "./base.repository";
import { UserRepository as IUserRepository } from "../implementations/user.repository.interface";
import { Database } from "sqlite3";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
	constructor(db: Database) {
		super(db, 'user')
	}

	async findAll(): Promise<User[]> {
		return new Promise((resolve, reject) => {
			this.db.all('SELECT * FROM users', (err, rows) => {
				if (err) {
					reject(err)
				} else {
					resolve(rows as User[])
				}
			})
		})
	}

	async findById(id: number): Promise<User | null> {
		return new Promise((resolve, reject) => {
			this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
				if (err) {
					reject(err)
				} else {
					resolve(row as User || null)
				}
			})
		})

	}

	async findByEmail(email: string): Promise<User | null> {
		return new Promise((resolve, reject) => {
			this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
				if (err) {
					reject(err)
				} else {
					resolve(row as User || null)
				}
			})
		})
	}

	async create(user: User): Promise<User> {
		return new Promise((resolve, reject) => {
			const now = new Date()
			this.db.run(
				'INSERT INTO users (username, email, created_at, updated_at) VALUES (?, ?, ?, ?)', [user.username, user.email, now, now],
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

	async update(id: number, user: User): Promise<User | null> {
		return new Promise((resolve, reject) => {
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
		return new Promise((resolve, reject) => {
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
