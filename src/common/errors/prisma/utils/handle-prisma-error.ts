import { TPrismaClientError } from '../PrismaClientError';
import { PrismaGenericError } from '../types/PrismaGenericError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';

enum PrismaError {
  UniqueConstraintError = 'P2002',
}

export const handlePrismaError = (e: TPrismaClientError): Error => {
  switch (e.code) {
    case PrismaError.UniqueConstraintError:
      return new UniqueConstraintError(e);
    default:
      return new PrismaGenericError(e.message);
  }
};
