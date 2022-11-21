import { UserType } from '@app/entities/User';

export type CreateUserRequest = UserType;
export interface CreateUserResponse {
  id: string
  name: string
  email: string
  token: string
};

export interface SingInRequest {
  email: string
  password: string
};

export type SingInResponse = string;

export interface IUserService {
  create: (data: CreateUserRequest) => Promise<CreateUserResponse>
  singIn: (data: SingInRequest) => Promise<SingInResponse>
  validate: (email: string) => Promise<string>
}
