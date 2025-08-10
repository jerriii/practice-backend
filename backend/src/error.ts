export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 400,
        public details?: any,
        public status: string = "error"
    ) {
        super(message);
        this.name = this.constructor.name;
        // Only capture stack trace in development
        if (process.env.NODE_ENV === 'development') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, details);
    }
}

export class ImageValidationError extends AppError {
    constructor(message: string = "Invalid image file", details?: any) {
        super(message, 400, details);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, details);
    }
}

export class DuplicateKeyError extends AppError {
    constructor(message: string = "Duplicate key violation", details?: any) {
        super(message, 400, details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 401, details);
    }
}

export class PaymentRequiredError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 402, details);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 403, details);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 404, details);
    }
}

export class MethodNotAllowedError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 405, details);
    }
}

export class NotAcceptableError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 406, details);
    }
}

export class BusinessRuleError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 422, details);
    }
}

export class ConflictError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 409, details);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 500, details);
    }
}


