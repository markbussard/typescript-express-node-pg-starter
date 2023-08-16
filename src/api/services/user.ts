import { pool } from '@/db';
import { CreateUserDTO, User, UserRole } from '@/types';

export class UserService {
  public async getById(id: string) {
    const queryText = `
      select
        id,
        email,
        first_name AS "firstName",
        last_name AS "lastName",
        role
      from "user"
      where id = $1
    `;
    const values = [id];
    const res = await pool.query<User>(queryText, values);
    return res.rows[0];
  }

  public async create(payload: CreateUserDTO) {
    const { id, email, firstName, lastName } = payload;
    const queryText = `
      insert into "user" (id, email, first_name, last_name, role)
      values ($1, $2, $3, $4, $5)
      returning
        id,
        email,
        first_name AS "firstName",
        last_name AS "lastName",
        role
    `;
    const values = [id, email, firstName, lastName, UserRole.User];
    const res = await pool.query<User>(queryText, values);
    return res.rows[0];
  }
}
