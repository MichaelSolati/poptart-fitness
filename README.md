# Poptart Fitness [![Build Status](https://travis-ci.org/MichaelSolati/poptart-fitness.svg?branch=master)](https://travis-ci.org/MichaelSolati/poptart-fitness)

Poptart Fitness invites users to connect and partake in recreational area they may not know exist in Connecticut. Users can schedule and join events, which are displayed on their profile and on a map.

This project is live and available at [https://poptart.fitness](https://poptart.fitness).

## Installing Dependencies

Run the command `npm install` to obtain all the required project dependancies. 

You may need to add two global packages as well: The Angular CLI and Firebase Tools. Both of these can be obtained with the following commands: `npm install -g @angular/cli` and `npm install -g firebase-tools`.


## Firebase Configuration

You will need a Firebase application set up in order to use this app. You can create one on the [Firebase website](https://firebase.com/). After you have created an application, copy the Firebase web configuration into the `environment.ts` and `environment.prod.ts` files, found in `./src/evironments`, as the `firebase` object.

Make sure that the file in the root directory of this project, `.firebaserc` has the `default` (and `dev`) field appropriately set as the ID of your Firebase project.

After you are sure that you have configured this correctly, launch `npm run deploy`, which will deploy your application as well as set up Firebase Functions and Database Rules.

To load default data, make a get request to the Firebase Function called `ct`. The url would be `https://us-central1-<APPID>.cloudfunctions.net/ct`.

Finally it is advised that you enable social logins with either Google, Facebook or Twitter. You can set that up at `https://console.firebase.google.com/project/<APPID>/authentication/providers`


## Starting App
To test the application locally, simply run the command `npm run start`.


## Documentation
This documentation is live and available at [https://docs.poptart.fitness](https://docs.poptart.fitness).