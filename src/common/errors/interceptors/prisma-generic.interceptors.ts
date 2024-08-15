import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { isPrismaError } from '../prisma/utils/is-prisma-error';
import { handlePrismaError } from '../prisma/utils/handle-prisma-error';
import { PrismaGenericError } from '../prisma/types/PrismaGenericError';

@Injectable()
export class PrismaGenericInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handlePrismaError(error);
        }
        if (error instanceof PrismaGenericError) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }),
    );
  }
}
