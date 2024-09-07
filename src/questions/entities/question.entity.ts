import { Question } from '@prisma/client';

export class QuestionEntity implements Question {
  id: number;
  title: string;
  createdAt: Date;
  updateAt: Date;
  userId: number;
  categoryId: number;
}
