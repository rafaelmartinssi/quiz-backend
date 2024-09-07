import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionsRepository } from './repositories/questions.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    PrismaService,
    QuestionsRepository,
    UsersRepository,
    CategoriesRepository,
  ],
})
export class QuestionsModule {}
