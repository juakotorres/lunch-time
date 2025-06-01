import { NextFunction, Request, Response } from 'express';

const defaultCodeByStatus: Record<number, string> = {
  400: 'BAD_REQUEST',
  404: 'NOT_FOUND',
  500: 'INTERNAL_SERVER_ERROR',
};

export class AppError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = '') {
    super(message);
    this.status = status;
    this.code = code || defaultCodeByStatus[status] || 'INTERNAL_SERVER_ERROR';
  }
}

export const errorHandler = (
  error: AppError,
  _req: Request,
  res: Response,
  // This parameter needs to be defined so Express calls this middleware
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error('[AppError]:', error);

  const status = error.status || 500;
  const code = error.code || defaultCodeByStatus[status] || 'INTERNAL_SERVER_ERROR';
  const message = error.message || 'Internal server error';

  res.status(status).json({
    error: { message, code },
  });
};
