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

exports.checkins = functions.database.ref('/checkins/{checkinId}').onCreate((event) => {
  const checkin = event.data.val();
  const profiles = admin.database().ref('/profiles');
  const events = admin.database().ref('/events');
  const checkins = admin.database().ref('/checkins');

  events.child(checkin.eid).on('value', (snapshot) => {
    const event = snapshot.val();
    if (!event) { 
      return checkins.child(event.params.checkinId).remove();
    }
    profiles.child(checkin.uid).on('value', (snapshot) => {
      const profile = snapshot.val();
      if (!profile) {
        return checkins.child(event.params.checkinId).remove();
      }
      const badges = profile.badges;
      badges.forEach((badge) => {
        if (badge.name === 'Attendance') { badge.progress++; }
      });

      const activities = profile.activities || [];
      const activityIndex = activities.findIndex((activity) => activity.name === event.activity);
      (activityIndex >= 0) ? activities[activityIndex].count++ : activities.push({ name: event.activity, count: 1 });

      return profiles.child(checkin.uid).update({
        activities: activities,
        badges: badges
      });
    });
  });
});

