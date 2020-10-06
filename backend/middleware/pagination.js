const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log("search", search);
    const results = {};

    const regex = new RegExp(search);

    const data = await model
      .find({ name: regex }, "-password")
      .limit(limit)
      .skip(startIndex)
      .exec();

    const data1 = await model.find({ name: regex }, "-password").exec();

    if (endIndex < data1.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    results.pageNumber = Math.round(data1.length / limit + 0.4);

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = data;
      // const finalResults = results.results.filter((user) => {
      //   return user.name.includes("asd");
      // });
      // console.log("finalResults", finalResults);
      // console.log("results", results);
      // console.log("paginatedResults", results);
      res.paginatedResults = results;
      next();
    } catch (e) {
      console.log("e", e);
    }
  };
};

module.exports = paginatedResults;
