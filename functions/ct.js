const functions = require('firebase-functions');
const admin = require('firebase-admin');
const GeoFire = require('geofire');
const httpRequire = require('request');
admin.initializeApp(functions.config().firebase);

exports.ct = functions.https.onRequest((request, response) => {
  const places = admin.database().ref('/places');
  const geoFire = new GeoFire(admin.database().ref('/geofire/places'));
  const options = {
    method: 'GET',
    url: 'https://data.ct.gov/api/geospatial/sg4r-4tnv',
    qs: { method: 'export', format: 'GeoJSON' }
  };
  httpRequire(options, (err, res, body) => {
    if (err) throw new Error(err);
    const locations = [];
    for (const feature of JSON.parse(body).features) {
      const location = {
        id: feature.properties.access_id,
        name: feature.properties.property,
        activities: [...new Set([feature.properties.prop_type, feature.properties.acc_type])],
        coordinates: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]
        }
      }
      locations.push(location);
      places.child(location.id).set(location);
      const coords = [location.coordinates.lat, location.coordinates.lng];
      geoFire.set(location.id, coords).then(() => {
        console.log('Update succesfull');
      }).catch(error => {
        console.log(error);
      });
    }
    response.send(JSON.stringify({ results: locations }));
  });
});
