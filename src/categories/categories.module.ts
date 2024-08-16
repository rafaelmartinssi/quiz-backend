import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesRepository } from './repositories/categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, CategoriesRepository],
})
export class CategoriesModule {}
