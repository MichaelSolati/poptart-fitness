const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const ct = require('./ct').ct;
const user = require('./user').user;
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
exports.ct = ct;
exports.user = user;