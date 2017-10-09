const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const activeEvents = require('./events').activeEvents;
// const purgeActiveEvents = require('./events').purgeActiveEvents;
const ct = require('./places').ct;
const user = require('./user').user;
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.activeEvents = activeEvents;
// exports.purgeActiveEvents = purgeActiveEvents;
exports.ct = ct;
exports.user = user;