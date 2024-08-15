import { ConflictError } from '../../types/ConflictError';
import { TPrismaClientError } from '../PrismaClientError';

export class UniqueConstraintError extends ConflictError {
  constructor(e: TPrismaClientError) {
    const uniqueField = e.meta.target;

    super(`A record with this ${uniqueField} alredy exists`);
  }
}
