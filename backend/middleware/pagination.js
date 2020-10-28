const paginatedResults = (model, modelName) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;

    console.log("limit", limit);
    console.log("page", page);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const regex = new RegExp(search);

    let data;

    if (modelName === "User") {
      data = await model
        .find({ name: regex }, "-password")
        .limit(limit)
        .skip(startIndex)
        .exec();
    } else if (modelName === "Place") {
      data = await model.find({}).limit(limit).skip(startIndex).exec();
    }

    // console.log("data", data);

    let fullData;

    if (modelName === "User") {
      fullData = await model.find({ name: regex }, "-password").exec();
    } else if (modelName === "Place") {
      fullData = await model.find({}).exec();
    }

    if (endIndex < fullData.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    results.pageNumber = Math.round(fullData.length / limit + 0.4);

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }
    // console.log("data", data);
    try {
      // console.log("data", data);
      results.results = data;
      res.paginatedResults = results;
      next();
    } catch (e) {
      console.log("e", e);
    }
  };
};

module.exports = paginatedResults;
