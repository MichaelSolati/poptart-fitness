const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.user = functions.auth.user().onCreate((event) => {
  const profile = event.data;
  const profiles = admin.database().ref('/profiles');
  profiles.child(profile.uid).set({
    name: profile.displayName,
    email: profile.email,
    photoURL: profile.photoURL,
    uid: profile.uid
  });
});