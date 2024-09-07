import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionEntity } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.prisma.question.create({
      data: createQuestionDto,
    });
  }

  async findAll(): Promise<Array<QuestionEntity>> {
    return this.prisma.question.findMany();
  }

  async findOne(id: number): Promise<QuestionEntity> {
    return this.prisma.question.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number): Promise<QuestionEntity> {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
