# Experience Tracker
Experience tracker is a web application that helps users keep record of their favorite life experiences. Take for example, a list of concerts: the name, date, location, image and a short description for each can be logged and added to a new collection titled "concerts". All data is saved to your account and is accessible the next time you 
log in.

# How To Use
## Set Up Environment

```sh
touch server/.env
```
```sh
MONGO_USER={REPLACE WITH MONGODB USERNAME}
MONGO_PASS={REPLACE WITH MONGODB PASSWORD}
JWT_SECRET={REPLACE WITH JSON WEB TOKEN SECRET}
PASSPORTSECRET={REPLACE WITH PASSPORT SECRET}
```

## Install/Run

```sh
# Clone this repository
$ git clone https://github.com/keeganhanesboise/experience-tracker.git

# Go into the repository
$ cd experience-tracker

# Install dependencies
$ cd client npm install
$ cd ../server npm install

# Run the app
$ cd client
$ npm start
$ cd ../server
$ node app.js
```

# Usage Examples

* Create an account by opening the side menu and navigating to "sign up"
* Log in with your newly created username and password
* Begin by creating a new collection (ex: concerts, national parks, schools, campsites, theaters, countries, national monuments)
* Add experiences to this collection by adding a title and selecting the collection it belongs to from the dropdown
* Optionally you can add the date and location the experience took place, a short description and an image under 2MB
* If an experience has an image, clicking the image's preview will open a larger version
* Individual experiences can be removed by clicking their corresponding x button
* If you'd like to remove an entire collection along with it's experiences you can click the collections corresponding "Remove" button
* Use the side menu again to sign out or log in to another account

## Login page:
<img src="imgs\Screenshot 2022-09-22 141005.png">

<br>

## Main page with "Concerts" and "National Parks" collections containing experiences:
<img src="imgs\Screenshot 2022-09-22 132111.jpeg">

<br>

## Image modal opened:
<img src="imgs\Screenshot 2022-09-22 132543.jpeg">

<br>

# Credits

This software uses the following:

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Google Cloud Storage](https://cloud.google.com/storage)
- [MongoDB](https://www.mongodb.com/)
