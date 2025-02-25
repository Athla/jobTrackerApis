import { User } from "../../models/user.model";
import { Repository } from "./repository.interface";

export interface UserRepository extends Repository<User> {
	findByEmail(email: string): Promise<User | null>
}
