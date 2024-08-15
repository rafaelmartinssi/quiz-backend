import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type TPrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
