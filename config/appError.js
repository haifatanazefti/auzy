//creating a class that help to handle error in the app
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  
      //Operational status sended for the client
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
module.exports = AppError;
  