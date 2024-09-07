import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './repositories/questions.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionsRepository,
    private readonly categoryRepository: CategoriesRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const { userId, categoryId } = createQuestionDto;
    await this.userExist(userId);
    await this.categoryExist(categoryId);
    return this.questionRepository.create(createQuestionDto);
  }

  async findAll(): Promise<Array<QuestionEntity>> {
    return this.questionRepository.findAll();
  }

  async findOne(id: number): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundError('Pergunta não encontrada');
    }
    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    await this.findOne(id);
    const { userId, categoryId } = updateQuestionDto;
    await this.userExist(userId);
    await this.categoryExist(categoryId);
    return this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: number): Promise<QuestionEntity> {
    await this.findOne(id);
    return this.questionRepository.remove(id);
  }

  async userExist(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
  }

  async categoryExist(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }
  }
}
