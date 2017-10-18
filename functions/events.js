const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.activeEvents = functions.database.ref('/events/{eventId}').onCreate((event) => {
  const activeEvents = admin.database().ref('activeEvents');
  activeEvents.child(event.params.eventId).set(event.data.val());
});

exports.purgeActiveEvents = functions.https.onRequest((request, response) => {
  const activeEvents = admin.database().ref('activeEvents');
  let now = new Date();
  now = now.getTime();
  const ref = activeEvents.orderByChild('ends').endAt(now);
  ref.on('value', (snapshot) => {
    const events = snapshot.val();
    for (let id of Object.keys(events)) {
      activeEvents.child(id).remove();
    }
    response.send(JSON.stringify({ results: events }));
  }, (errorObject) => {
    response.send('The purge failed: ' + errorObject.code);
  });
});
