export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public validationErrors?: any,
    public status: string = "error"
  ) {
    super(message);
    this.name = this.constructor.name;
    // Only capture stack trace in development
    if (process.env.NODE_ENV === "development") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 400, validationErrors);
  }
}

export class ImageValidationError extends AppError {
  constructor(message: string = "Invalid image file", validationErrors?: any) {
    super(message, 400, validationErrors);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 400, validationErrors);
  }
}

export class DuplicateKeyError extends AppError {
  constructor(
    message: string = "Duplicate key violation",
    validationErrors?: any
  ) {
    super(message, 400, validationErrors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 401, validationErrors);
  }
}

export class PaymentRequiredError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 402, validationErrors);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 403, validationErrors);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 404, validationErrors);
  }
}

export class MethodNotAllowedError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 405, validationErrors);
  }
}

export class NotAcceptableError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 406, validationErrors);
  }
}

export class BusinessRuleError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 422, validationErrors);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 409, validationErrors);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, validationErrors?: any) {
    super(message, 500, validationErrors);
  }
}


