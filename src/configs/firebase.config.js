// firebase.js
const admin = require("firebase-admin");



admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.SERVICE_ACCOUNT_TYPE,
    "project_id":process.env.SERVICE_ACCOUNT_ID ,
    "private_key_id":process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID ,
    "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email":process.env.SERVICE_ACCOUNT_CLIENT_EMAIL ,
    "client_id": process.env.SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri":process.env.SERVICE_ACCOUNT_AUTH_URL,
    "token_uri":process.env.SERVICE_ACCOUNT_TOKEN_URI ,
    "auth_provider_x509_cert_url":process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_CERT,
    "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_CERT_URL,
    "universe_domain": process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN
  }
  ),
});

module.exports = admin;
