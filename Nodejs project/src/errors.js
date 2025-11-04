export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
