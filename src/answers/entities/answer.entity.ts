import { Answer } from '@prisma/client';

export class AnswerEntity implements Answer {
  id: number;
  title: string;
  isCorrect: boolean;
  createdAt: Date;
  updateAt: Date;
  userId: number;
  questionId: number;
}
