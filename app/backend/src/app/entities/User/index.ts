import { v4 as uuid } from 'uuid';

export interface UserType {
  id?: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date | null
}

export class User implements UserType {
  private readonly _id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor(props: UserType) {
    this._id = props.id ?? uuid();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }

  get id(): string {
    return this._id;
  }
}
