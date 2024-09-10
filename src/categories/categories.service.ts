import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private usersService: UsersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { userId } = createCategoryDto;
    await this.usersService.findOne(userId);
    return this.categoriesRepository.create(createCategoryDto);
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    await this.findOne(id);
    const { userId } = updateCategoryDto;
    await this.usersService.findOne(userId);
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<CategoryEntity> {
    await this.findOne(id);
    return this.categoriesRepository.remove(id);
  }
}
