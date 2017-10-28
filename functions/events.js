const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.activeEvents = functions.database.ref('/events/{eventId}').onCreate((event) => {
  const profiles = admin.database().ref('/profiles');
  const activeEvents = admin.database().ref('activeEvents');
  const newEvent = event.data.val();
  const newEventId = event.params.eventId;
  profiles.child(newEvent.uid).on('value', (snapshot) => {
    const profile = snapshot.val();
    if (!profile) {
      return events.child(newEventId).remove();
    } else {
      return activeEvents.child(newEventId).set(newEvent);
    }
  });
});

exports.createEvent = functions.database.ref('/events/{eventId}').onCreate((event) => {
  const events = admin.database().ref('events');
  const profiles = admin.database().ref('/profiles');
  const newEvent = event.data.val();
  const newEventId = event.params.eventId;
  profiles.child(newEvent.uid).on('value', (snapshot) => {
    const profile = snapshot.val();
    if (!profile) {
      return events.child(newEventId).remove();
    } else {
      const badges = profile.badges;
      badges.forEach((badge) => {
        if (badge.name === 'Leadership') { badge.progress++; }
      });
      return profiles.child(newEvent.uid).update({
        badges: badges
      });
    }
  });
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
    response.send(JSON.stringify({
      results: events
    }));
  }, (errorObject) => {
    response.send('The purge failed: ' + errorObject.code);
  });
});

exports.checkins = functions.database.ref('/checkins/{checkinId}').onCreate((event) => {
  const checkin = event.data.val();
  const profiles = admin.database().ref('/profiles');
  const events = admin.database().ref('/events');
  const checkins = admin.database().ref('/checkins');
  const today = new Date();

  profiles.child(checkin.uid).on('value', (snapshot) => {
    const profile = snapshot.val();
    if (!profile) {
      return checkins.child(event.params.checkinId).remove();
    }
    events.child(checkin.eventId).on('value', (snapshot) => {
      const event = snapshot.val();
      if (!event) {
        return checkins.child(event.params.checkinId).remove();
      } else if (event.starts > today.getTime() || event.ends >= today.getTime() + 86400000) {
        return checkins.child(event.params.checkinId).remove();
      } else {
        const badges = profile.badges;
        badges.forEach((badge) => {
          if (badge.name === 'Attendance') {
            badge.progress++;
          }
        });
        const activities = profile.activities || [];
        const activityIndex = activities.findIndex((activity) => activity.name === event.activity);
        (activityIndex >= 0) ? activities[activityIndex].count++ : activities.push({
          name: event.activity,
          count: 1
        });
        return profiles.child(checkin.uid).update({
          activities: activities,
          badges: badges
        });
      }
    });
  });
});

exports.popularity = functions.database.ref('/checkins/{checkinId}').onCreate((event) => {
  const checkin = event.data.val();
  const checkinId = event.params.checkinId;
  const profiles = admin.database().ref('/profiles');
  const events = admin.database().ref('/events');

  events.child(checkin.eventId).on('value', (snapshot) => {
    const event = snapshot.val();
    if (!event) {
      return checkins.child(checkinId).remove();
    } else {
      profiles.child(event.uid).on('value', (snapshot) => {
        const profile = snapshot.val();
        if (!profile) {
          return checkins.child(checkinId).remove();
        } else {
          const badges = profile.badges;
          badges.forEach((badge) => {
            if (badge.name === 'Popularity') { badge.progress++; }
          });
          return profiles.child(event.uid).update({
            badges: badges
          });
        }
      });
    }
  });
});
