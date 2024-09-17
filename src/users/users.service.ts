import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { generateHash } from 'src/common/bcrypt/hash-provider';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email } = createUserDto;
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new BadRequestError('Email já cadastrado');
    }

    const hashPassword = await generateHash(createUserDto.password);
    createUserDto.password = hashPassword;

    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<Array<UserEntity>> {
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
