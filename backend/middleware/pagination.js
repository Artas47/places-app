const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    results.pageNumber = Math.round(
      (await model.countDocuments().exec()) / limit + 0.4
    );

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model
        .find({}, "-password")
        .limit(limit)
        .skip(startIndex)
        .exec();
      console.log("paginatedResults", results);
      res.paginatedResults = results;
      next();
    } catch (e) {
      console.log("e", e);
    }
  };
};

module.exports = paginatedResults;
