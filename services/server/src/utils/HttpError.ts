class HttpError extends Error {
  public statusCode: number;

  constructor(message: any, statusCode = 400, ...params: any) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
    this.name = 'HttpError';
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpError;
