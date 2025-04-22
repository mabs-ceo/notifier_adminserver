// firebase.js
const admin = require("firebase-admin");

const serviceAccount = require("../etc/secrets/service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
