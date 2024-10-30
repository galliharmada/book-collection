import { Role } from 'src/role/roles.enum';

export class Users {
  id: number;

  email: string;

  roles: Role;

  password: string;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}
