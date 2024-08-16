import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: number;
  title: string;
  createdAt: Date;
  updateAt: Date;
  userId: number;
}
