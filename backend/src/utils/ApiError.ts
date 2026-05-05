export type ApiErrorType = {
  type: 'API_ERROR';
  statusCode: number;
  message: string;
  errors: any[];
};

export const createApiError = (
  statusCode: number,
  message = 'Something went wrong',
  errors: any[] = []
): ApiErrorType => ({
  type: 'API_ERROR',
  statusCode,
  message,
  errors
});