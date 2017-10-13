const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.user = functions.auth.user().onCreate((event) => {
  const profile = event.data;
  const profiles = admin.database().ref('/profiles');
  const badges = admin.database().ref('/badges');
  const userbadges = admin.database().ref('/userBadges')
  profiles.child(profile.uid).set({
    name: profile.displayName,
    email: profile.email,
    photoURL: profile.photoURL,
    uid: profile.uid
  });

  badges.on('value', (snapshot) => {
    const badgeresults = snapshot.val();
    for (id in badgeresults) {
      userbadges.push({
      progress: 0,
      tier: 0,
      uid: profile.uid,
      badge: badgeresults[id],
      bid: id
      });
    }
  });
});