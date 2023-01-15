class HttpError extends Error {

    constructor (message, status) {
      super(message)
      this.statusCode = status
      this.name = 'HttpError'
    }
  }
  
  module.exports = HttpError
  