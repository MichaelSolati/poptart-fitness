const functions = require('firebase-functions');
const admin = require('firebase-admin');

const badges = [{
  progress: 0,
  name: 'Attendance',
  description: 'Way to go, showing up and being cool... Keep it up.'
}, {
  progress: 0,
  name: 'Leadership',
  description: 'Taking charge by making events, way to go champ.'
}, {
  progress: 0,
  name: 'Popularity',
  description: 'Everyone wants to go to the party, and the party is wherever you are!'
}]

exports.user = functions.auth.user().onCreate((event) => {
  const profiles = admin.database().ref('/profiles');
  const profile = {
    name: event.data.displayName,
    email: event.data.email,
    photoURL: event.data.photoURL,
    uid: event.data.uid,
    badges: badges
  };

  profiles.child(profile.uid).set(profile);
});

