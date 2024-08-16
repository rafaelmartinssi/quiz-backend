import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    await this.findUser(createCategoryDto.userId);
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }
    return category;
  }

  async findUser(id: number): Promise<UserEntity> {
    const user = await this.categoryRepository.findUser(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return user;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    await this.findOne(id);
    await this.findUser(updateCategoryDto.userId);
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<CategoryEntity> {
    await this.findOne(id);
    return this.categoryRepository.remove(id);
  }
}
