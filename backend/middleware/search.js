const searchMiddleware = (model) => {
  return async (req, res, next) => {
    const search = req.query.search;
    res.search = search;
    next();
  };
};

module.exports = searchMiddleware;
