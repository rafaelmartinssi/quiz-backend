import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './repositories/questions.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { QuestionEntity } from './entities/question.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const { userId, categoryId } = createQuestionDto;
    await this.usersService.findOne(userId);
    await this.categoriesService.findOne(categoryId);
    return this.questionsRepository.create(createQuestionDto);
  }

  async findAll(): Promise<Array<QuestionEntity>> {
    return this.questionsRepository.findAll();
  }

  async findOne(id: number): Promise<QuestionEntity> {
    const question = await this.questionsRepository.findOne(id);
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
    await this.usersService.findOne(userId);
    await this.categoriesService.findOne(categoryId);
    return this.questionsRepository.update(id, updateQuestionDto);
  }

  async remove(id: number): Promise<QuestionEntity> {
    await this.findOne(id);
    return this.questionsRepository.remove(id);
  }
}
