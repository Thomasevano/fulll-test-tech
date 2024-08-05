import { User } from '../entities/user';

export interface UserRepository {
  save(user: User): void;
  findUserById(id: string): User;
}