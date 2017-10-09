const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.activeEvents = functions.database.ref('/events/{eventId}').onCreate((event) => {
  const activeEvents = admin.database().ref('activeEvents');
  activeEvents.child(event.params.eventId).set(event.data.val());
});

// exports.purgeActiveEvents = functions.https.onRequest((request, response) => {
//   const activeEvents = admin.database().ref('activeEvents');
//   let now = new Date();
//   now = now.getTime();
//   const ref = activeEvents.orderByChild('starts').startAt(0).endAt(now);
//   ref.on('value', (snapshot) => {
//     console.log(snapshot.val())
//     response.send(JSON.stringify({ results: snapshot.val() }));
//   }, (errorObject) => {
//     response.send('The read failed: ' + errorObject.code);
//   });
// });
