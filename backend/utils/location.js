const API_KEY = '7eb128cd7ae14fb5bad501669e1eee4a';
const axios = require('axios');

const getCoordsForAdress = async (address) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?key=7eb128cd7ae14fb5bad501669e1eee4a&q=${address}&pretty=1`
  );
  const coordinates = response.data.results[0].geometry;
  return coordinates;
};

module.exports = getCoordsForAdress;
