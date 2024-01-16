export class LateCheckInValidateError extends Error {
  constructor() {
    super('The check-in can only be validated until 2o minutes of its creation')
  }
}
