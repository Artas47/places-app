const API_KEY = process.env.MAP_DATA_KEY;
const axios = require("axios");

const getCoordsForAdress = async (address) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${address}&pretty=1`
    );
  const coordinates = response.data.results[0].geometry;
  return { coordinates };
};

module.exports = getCoordsForAdress;
