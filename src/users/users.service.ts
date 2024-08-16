import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<Array<UserEntity>> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    await this.findOne(id);
    return this.usersRepository.remove(id);
  }
}
