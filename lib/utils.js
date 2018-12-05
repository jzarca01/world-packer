const cheerio = require('cheerio');
const slugify = require('slugify');

function parseItems(body) {
  const items = [];
  const $ = cheerio.load(body);

  return new Promise((resolve, reject) => {
    $('.vp-card').each((i, element) => {
      const infos = $(element).children('.volunteer_position_result');
      const cityCountry = infos
        .children('.info_holder')
        .children('p')
        .children('span')
        .last()
        .text();
      const exchange = infos.children('.info_holder').children('.exchange');
      const place = {
        id: infos.attr('data-map-marker'),
        type: infos
          .children('.info_holder')
          .children('p')
          .children('span')
          .first()
          .text(),
        location: {
          city: cityCountry.split(', ')[0],
          country: cityCountry.split(', ')[1]
        },
        title: infos
          .children('.info_holder')
          .children('h2')
          .text(),
        url: 'http://www.worldpackers.com' + $(element).attr('href'),
        img: infos
          .children('.photo_holder')
          .children('.vp_photo')
          .attr('data-src'),
        details: {
          workTime: exchange
            .children('.with-separators')
            .first()
            .children('span')
            .first()
            .text(),
          position: exchange
            .children('.with-separators')
            .first()
            .children('span')
            .last()
            .text(),
          duration: exchange
            .children('.with-separators')
            .last()
            .children('span')
            .first()
            .text(),
          sleepType: exchange
            .children('.with-separators')
            .last()
            .children('span:nth-child(2)')
            .text(),
          meals: exchange
            .children('.with-separators')
            .last()
            .children('span')
            .last()
            .text()
        }
      };
      items.push(place);
    });
    resolve(items);
  });
}

function getPaginationNextLink(body) {
  const $ = cheerio.load(body);
  const nextPageLink = $('.current')
    .next('.page')
    .find('a')
    .attr('href');
  return nextPageLink;
}

function parseRegions(body) {
  const items = [];
  const $ = cheerio.load(body);

  return new Promise((resolve, reject) => {
    $('.destination').each((i, element) => {
      const region = {
        name: $(element)
          .text()
          .replace(/\n/g, ''),
        slug: slugify($(element).text(), {
          replacement: '_',
          lower: true
        }),
        url: $(element)
          .children('.light')
          .attr('href')
      };
      items.push(region);
    });
    resolve(items);
  });
}

module.exports = {
  parseItems,
  getPaginationNextLink,
  parseRegions
};
