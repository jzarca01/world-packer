const WorldPackers = require('..');
const world = new WorldPackers();

const Rome2Rio = require('node-rome2rio');
const rome = new Rome2Rio({
  apiKey: 'adAxxVif'
});

const slugify = require('slugify');
const Visalist = require('node-visalist');
const visa = new Visalist({
  apiKey: 'x4xhhAeK6MajeqcB'
});

const DEPARTURE = 'Paris,France';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function init() {
  try {
    const places = await world.getPlaces('europe');
    const travelArray = [];
    await asyncForEach(places, async place => {
      try {
        const travel = await rome.search({
          departure: DEPARTURE,
          arrival: `${place.location.city},${place.location.country}`
        });
        const route = travel.routes[0];
        const visaRequirements = await visa.getRequirementsForACountry(
          'france',
          slugify(place.location.country, {
            lower: true
          })
        );
        const item = {
          departure: DEPARTURE,
          arrival: `${place.location.city}, ${place.location.country}`,
          duration: route.totalDuration,
          distance: route.distance,
          price: route.indicativePrices[0].price,
          visa: visaRequirements,
          ...place
        };
        travelArray.push(item);
      } catch (err) {
        //console.log('\n');
      }
    });
    const filteredArray = travelArray.filter(
      item => item.details.sleepType === 'Private Room'
    );
    console.log(filteredArray.sort((a, b) => (a.price < b.price ? -1 : 1)));
  } catch (err) {
    //console.log(err);
  }
}

init();
