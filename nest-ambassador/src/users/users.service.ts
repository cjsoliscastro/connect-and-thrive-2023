import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { IFindUserParams } from './find-user-params.interface';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async save(user: Partial<Users>) {
    const newUser = this.usersRepository.create(user);

    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  async findOne({ email, id }: IFindUserParams) {
    return this.usersRepository.findOne({ where: { email, id } });
  }

  async find(options: Partial<Users>) {
    return this.usersRepository.find({ where: options });
  }

  async updateUser(id: string, options: UpdateUserInfoDto) {
    try {
      await this.usersRepository.update(id, options);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }

    return this.findOne({ id });
  }
}
