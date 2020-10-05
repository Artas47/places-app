const searchMiddleware = (model) => {
  return async (req, res, next) => {
    // console.log("req.params", req.params);
    const search = req.query.search;
    res.search = search;
    next();
  };
};

module.exports = searchMiddleware;
