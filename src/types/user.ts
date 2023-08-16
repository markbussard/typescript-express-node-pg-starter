import { BaseEntity } from './base';

export enum UserRole {
  User = 'user',
  Admin = 'admin'
}

export interface User extends BaseEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CreateUserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
