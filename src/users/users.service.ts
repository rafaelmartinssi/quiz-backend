import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { generateHash, compareHash } from 'src/common/bcrypt/hash-provider';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new BadRequestError('Email já cadastrado');
    }

    const hashPassword = await generateHash(password);
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

  async updatePassword(
    id: number,
    updatePasswordUserDto: UpdatePasswordUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(id);

    const { oldPassword, password } = updatePasswordUserDto;
    const checkOldPassword = await compareHash(oldPassword, user.password);

    if (!checkOldPassword) {
      throw new UnauthorizedError('Senha incorreta.');
    }

    const hashPassword = await generateHash(password);
    user.password = hashPassword;

    return this.usersRepository.update(id, user);
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError(
        'Não foi encontrado usuário para o email informado.',
      );
    }

    const checkPasswordMatch = await compareHash(password, user.password);

    if (!checkPasswordMatch) {
      throw new UnauthorizedError('Senha incorreta.');
    }

    const { accessToken } = await this.authService.generateJwt(user.id);
    return accessToken;
  }

  async remove(id: number): Promise<UserEntity> {
    await this.findOne(id);
    return this.usersRepository.remove(id);
  }
}
