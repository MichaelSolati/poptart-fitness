const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Geokit = require('geokit').Geokit;
const httpRequire = require('request');
const geokit = new Geokit();


exports.ct = functions.https.onRequest((request, response) => {
  const places = admin.database().ref('/places');
  const options = {
    method: 'GET',
    url: 'https://data.ct.gov/api/geospatial/sg4r-4tnv',
    qs: { method: 'export', format: 'GeoJSON' }
  };
  httpRequire(options, (err, res, body) => {
    if (err) throw new Error(err);
    const locations = [];
    for (const feature of JSON.parse(body).features) {
      const coordinates = {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      };
      const location = {
        id: feature.properties.access_id,
        name: feature.properties.property,
        activities: [...new Set([feature.properties.prop_type, feature.properties.acc_type])],
        coordinates: coordinates,
        hash: geokit.hash(coordinates)
      }
      locations.push(location);
      places.child(location.id).set(location);
    }
    response.send(JSON.stringify({ results: locations }));
  });
});

exports.wikipedia = functions.https.onRequest((request, response) => {
  const body = JSON.parse(request.body);
  const places = admin.database().ref('/places');
  if (!body.id) { throw new Error('No place id found'); }
  places.child(body.id).on('value', (snapshot) => {
    const place = snapshot.val();
    if (place.description) { return response.send(JSON.stringify({ results: place.description })); }
    const options = {
      method: 'GET',
      url: 'https://en.wikipedia.org/w/api.php',
      qs: { action: 'query', prop: 'extracts', format: 'json', titles: place.name }
    }
    httpRequire(options, (err, res, wikiBody) => {
      if (err) throw new Error(err);
      let description;
      try {
        let wikiResult = JSON.parse(wikiBody).query.pages;
        for (var prop in wikiResult) {
          try {
            description = wikiResult[prop].extract.replace(/<\/?[^>]+(>|$)/g, '');
          } catch (e) { }
          break;
        }
      } catch (e) { }
      places.child(place.id).update({ description: description });
    });
  });
});