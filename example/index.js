const WorldPackers = require('..');
const world = new WorldPackers();

async function init() {
  try {
    // Find web development trips in Brazil
    const places = await world.getPlaces('south_america', 'brazil');
    /*
    // Find web development trips in Europe
    const places = await world.getPlaces('europe');
    
    // Find web development trips in the world
    const places = await world.getPlaces();

    // Find all regions where there are web development trips
    const regions = await world.getRegions()

    // Find all countries in South American where there are web development trips
    const countries = await world.getCountries('south_america')
    */
    console.log(places);
  } catch (err) {
    console.log(err);
  }
}

init();
