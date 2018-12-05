# world-packers

Utility to help me choose my next destination by scrapping worldpackers.com

## Usage

```js
const WorldPackers = require('node-worldpackers');
const world = new Worlpackers();
```

### Get places where they need web development in the world

```js
world.getPlaces();
```

### Get places where they need web development in a region

```js
world.getPlaces(region);
```

### Get places where they need web development in a country

```js
world.getPlaces(region, country);
```

### Get regions

```js
world.getRegions();
```

### Get countries for a given region

```js
world.getCountries(region);
```
