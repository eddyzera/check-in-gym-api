export class MaxNumberCheckInError extends Error {
  constructor() {
    super('Max number of check-in reached')
  }
}
