const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server error');
  };
  
module.exports = errorHandler;  