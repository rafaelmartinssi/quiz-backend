import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { AnswerEntity } from '../entities/answer.entity';
import { UpdateAnswerDto } from '../dto/update-answer.dto';

@Injectable()
export class AnswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    return await this.prisma.answer.create({
      data: createAnswerDto,
    });
  }

  async findAll(): Promise<Array<AnswerEntity>> {
    return this.prisma.answer.findMany();
  }

  async findOne(id: number): Promise<AnswerEntity> {
    return this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerEntity> {
    return this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number): Promise<AnswerEntity> {
    return this.prisma.answer.delete({
      where: { id },
    });
  }
}
