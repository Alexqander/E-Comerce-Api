export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionError';
  }
}

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class AbortError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AbortError';
  }
}

export class RequestError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'RequestError';
    this.response = response;
  }
}

export class ResponseError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ResponseError';
    this.response = response;
  }
}

export class ParseError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ParseError';
    this.response = response;
  }
}

export class ValidationError extends Error {
  constructor(errors) {
    const message = errors
      .map((error) => `${error.dataPath} ${error.message}`)
      .join(', ');
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}
