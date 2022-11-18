import { IUserRepository } from '@app/repositories/User/IUserRepository';

export class FindUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error('User not found.');

    return user;
  }
}
