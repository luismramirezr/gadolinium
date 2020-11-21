class ValidationError extends Error {
  public statusCode: number;

  constructor(message: any, statusCode = 400, ...params: any) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
    this.name = 'ValidationError';
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ValidationError;
