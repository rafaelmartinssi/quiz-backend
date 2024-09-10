import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswersRepository } from './repositories/answers.repository';
import { UsersService } from 'src/users/users.service';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { QuestionsRepository } from 'src/questions/repositories/questions.repository';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [AnswersController],
  providers: [
    AnswersService,
    PrismaService,
    AnswersRepository,
    UsersService,
    UsersRepository,
    CategoriesService,
    CategoriesRepository,
    QuestionsService,
    QuestionsRepository,
  ],
})
export class AnswersModule {}
