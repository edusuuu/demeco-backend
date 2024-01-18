const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require("dotenv").config()

const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY,
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
})

const db = getFirestore()

module.exports = { db }
