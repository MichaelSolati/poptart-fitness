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


exports.wikipedia = functions.database.ref('/places/{placeId}').onCreate((event) => {
  console.log(event);
  // const places = admin.database().ref('places');
  // activeEvents.child(event.params.placeId).set(event.data.val());
});