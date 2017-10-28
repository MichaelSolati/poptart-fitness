## 1.0.0 (2017-10-28)

##### Build System / Dependencies

* **docs:** build and deploy docs during travis build (b25614b3)
* **firebase:** set project for deploy (8f6b3c57)
* add travis script, npm scripts, and dependencies (2a255c1f)

##### Chores

* **pwa:** update app icons (81296880)
* **events:** add authentication of location and time to check in (1d2f1aa9)
* **interfaces:**
  * create interface for user object (3b94befd)
  * create interfaces for items stored in firebase (3d94fdf7)
* **docs:**
  * add docs to create event and remove unused services (0a610ca5)
  * create docs for route guards (5d4eb9c9)
* **dependencies:** update npm dependencies (3d98086a)
* push to move progress to macbook (ca8f6164)
* configure dev environment for firebase (26971e25)
* initial commit from @angular/cli (8f82d9f2)

##### Documentation Changes

* **README:** update readme (d2dea86d)
* **functions:** add documentation for firebase functions (d80c671d)
* update readme (ae0712ff)
* add remaining docs to app (97cdeabc)
* sign-in component documentation and profile service documentation (5f4d4ea5)
* documentation for services (0c987826)
* add docs for components and services (and created activity pipe) 🤡 (d650a101)
* **places:** add docs for places service (35158c95)
* **location:** add docs for location service (0a2fac41)
* **services:** add documentation for user service (57939619)

##### New Features

* **navigation:** add link to navigate to a place on google maps (d2be101f)
* **functions:**
  * flesh out hooks for badges and validation in hooks (51755154)
  * api endpoint to fetch and parse CT parks data (ee6b5832)
* **events:**
  * show checked in users as chip (ee0a661a)
  * selecting events in home sets fragment in url for modal (f787cc63)
  * create hook to purge past events (cfb23ed8)
  * duplicate events into active collection (6b30dba5)
  * show events in place (12f15496)
  * display events in home (889e41a5)
  * create an event from place (a4f7d795)
* **profile:**
  * add route guard to ensure profile exists to navigate to (41c172c3)
  * display user attended and created events on profile (c575b22f)
  * link to profile from event (694f72e2)
  * create profile on account creation (c2a04703)
* **places:** open modal immediatley to event of route fragment (1e97facd)
* **pwa:** add service worker and manifest (886a9ea2)
* **wikipedia:** display wikipedia information on place page (2ac0b9f2)
* **activities:**
  * check in feature for events; various cleanup of services (b44a1868)
  * instantiate activity service and firebase (626b631f)
* **routes:** protect with guards and add navigation in home (895cda3e)
* **toggle:** stub toggle button in home navbar (ace97a6d)
* **badges:** instantiate badges on profile creation. (6a517c39)
* **place:** display place on map from id (0adb92ff)
* **welcome:**
  * create welcome component and user function (7eb5c5cb)
  * display user location on map (67be948f)
* **map:** query geohashes in home area (fca55da6)
* **home:** display map in home section (28cad666)
* **modules:** add core and shared modules (39a36ec3)

##### Bug Fixes

* **swipe:** fix swipe of cards on place page (580d19d5)
* **events:** change dimension of events modal (5eceeaa3)
* **functions:** get eventId instead of ied for checkins oncreate hook (bcdbc809)
* **map:**
  * disable centering on user swipe (055a3403)
  * fix map display and items overlaying on map (b4d236d3)
* **wikipedia:** set wikipedia as oncreate hook (639648a4)
* **services:** duplicate services in index.ts (8e00d1b9)
* **deploy:**
  * wrap serviceAccount in try/catch (1ee8649f)
  * wrap serviceAccount in try/catch (1356a269)
* **build:** install functions dependencies during postinstall (1c90d957)

##### Refactors

* **interfaces:** refactor import and export of interfaces (c5943ff8)
* **app:** fix quirks of some components and add swipe for nav (9bd3661f)
* **services:** add $key to queries (00688146)
* **profile:** reorganize component to use data from profile (3a71fb00)
* **events:** update events to query same way as places (64cddc33)
* **places:**
  * implement quicksort on distance in geofetch (2978dc5e)
  * imrpove performance of geoqueries (d40179cc)
* **home:** restyle home with fullscreen map and card (eb2bc705)
* **functions:** migrate from geofire to geokit (0fa15ba0)

##### Code Style Changes

* **sign-in:** embed sign-in component to welcome component (a20ec48f)

