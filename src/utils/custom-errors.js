class CustomError extends Error {
  constructor(type, { message, code }) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.code = code || null;
  }
}

class ConflictError extends CustomError {
  constructor({ message, code }) {
    super("ConflictError", { message, code });
  }
}

class ValidationError extends CustomError {
  constructor({ message, code }) {
    super("ValidationError", { message, code });
  }
}

class AuthenticationError extends CustomError {
  constructor({ message, code }) {
    super("AuthenticationError", { message, code });
  }
}

class AuthorizationError extends CustomError {
  constructor ({ message, code }) {
    super("AuthorizationError", { message, code });
  }
}

class NotFoundError extends CustomError {
  constructor({ message, code }) {
    super("NotFoundError", { message, code });
  }
}

class CaptchaError extends CustomError {
  constructor({ message, code }) {
    super("NotFoundError", { message, code });
  }
}

module.exports = {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  CaptchaError,
};
