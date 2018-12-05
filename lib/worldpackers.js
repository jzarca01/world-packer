const axios = require('axios');
const { parseItems, parseRegions, getPaginationNextLink } = require('./utils');

class WorldPackers {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://www.worldpackers.com'
    });
  }

  async getPlaces(region = null, country = null) {
    let items = [];
    let placeUrl = region
      ? country
        ? `/search/work_exchange/${region}/${country}/skill_web_development`
        : `/search/work_exchange/${region}/skill_web_development`
      : `/search/work_exchange/skill_web_development`;

    while (placeUrl !== undefined) {
      const placesBody = await this.getPlacesRequest(placeUrl);
      items = [...items, ...(await parseItems(placesBody))];
      placeUrl = getPaginationNextLink(placesBody);
    }
    return items;
  }

  async getPlacesRequest(placeUrl) {
    try {
      const response = await this.request({
        method: 'GET',
        url: placeUrl
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getRegions() {
    try {
      const response = await this.request({
        method: 'GET',
        url: `/search/work_exchange/skill_web_development`
      });
      return await parseRegions(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async getCountries(region) {
    try {
      const response = await this.request({
        method: 'GET',
        url: `/search/work_exchange/${region}/skill_web_development`
      });
      return await parseRegions(response.data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = WorldPackers;
