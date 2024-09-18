import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionsRepository } from './repositories/questions.repository';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    PrismaService,
    QuestionsRepository,
    UsersService,
    UsersRepository,
    CategoriesService,
    CategoriesRepository,
    AuthService,
  ],
})
export class QuestionsModule {}
