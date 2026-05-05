type ApiResponseType<T = any> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta: Record<string, any>;
};

export const ApiResponse = <T>(
  statusCode: number,
  data: T,
  message = 'Success',
  meta: Record<string, any> = {}
): ApiResponseType<T> => ({
  statusCode,
  success: statusCode < 400,
  message,
  data,
  meta
});