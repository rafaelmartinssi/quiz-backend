import { TPrismaClientError } from '../PrismaClientError';

export const isPrismaError = (e: TPrismaClientError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
