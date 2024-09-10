import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswersRepository } from './repositories/answers.repository';
import { UsersService } from 'src/users/users.service';
import { QuestionsService } from 'src/questions/questions.service';
import { AnswerEntity } from './entities/answer.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly usersService: UsersService,
    private readonly questionsService: QuestionsService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    const { userId, questionId } = createAnswerDto;
    await this.usersService.findOne(userId);
    await this.questionsService.findOne(questionId);
    return this.answersRepository.create(createAnswerDto);
  }

  async findAll(): Promise<Array<AnswerEntity>> {
    return this.answersRepository.findAll();
  }

  async findOne(id: number): Promise<AnswerEntity> {
    const answer = await this.answersRepository.findOne(id);
    if (!answer) {
      throw new NotFoundError('Resposta não encontrada');
    }
    return answer;
  }

  async update(
    id: number,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerEntity> {
    await this.findOne(id);
    const { userId, questionId } = updateAnswerDto;
    await this.usersService.findOne(userId);
    await this.questionsService.findOne(questionId);
    return this.answersRepository.update(id, updateAnswerDto);
  }

  async remove(id: number): Promise<AnswerEntity> {
    return this.answersRepository.remove(id);
  }
}
