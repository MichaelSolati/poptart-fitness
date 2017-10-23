const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://' + serviceAccount['project_id'] + '.firebaseio.com'
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

const activeEvents = require('./events').activeEvents;
const purgeActiveEvents = require('./events').purgeActiveEvents;
const ct = require('./places').ct;
const wikipedia = require('./places').wikipedia;
const user = require('./user').user;

exports.activeEvents = activeEvents;
exports.purgeActiveEvents = purgeActiveEvents;
exports.ct = ct;
exports.user = user;
exports.wikipedia = wikipedia;