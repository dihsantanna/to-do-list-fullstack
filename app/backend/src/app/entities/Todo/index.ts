import { v4 as uuid } from 'uuid';

export interface TodoType {
  id?: string
  title: string
  userId: string
  completed?: boolean
  createdAt?: Date
  updatedAt?: Date | null
}

export class Todo implements TodoType {
  private readonly _id: string;
  title: string;
  userId: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor (props: TodoType) {
    this._id = props.id ?? uuid();
    this.title = props.title;
    this.userId = props.userId;
    this.completed = !!props.completed;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }

  get id (): string {
    return this._id;
  }
}
