//creating a function to maintain the try catch bloc
module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };