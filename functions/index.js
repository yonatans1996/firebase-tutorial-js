// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const express = require("express");
var FCM = require("fcm-node");
const serverKey =
  "AAAA48c_Chc:APA91bFe8DBv_3z3PLokXrSjSRU-YGTWQPkhPV39ztSOYyFltGBCQKWD_vuXWZ4lifPsr66lOgN_xEm7uPR1dAcMux2vE3BNpy1EWh-BHrIi1EtCeyo9aWqscSy30QomdI2vTTOsWrbw";
const fcm = new FCM(serverKey);
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const firebaseConfig = {
  apiKey: "AIzaSyDFUn7-HV9z2h7tzNtuOzkM9Y18Xf7IdZo",
  authDomain: "test-6865c.firebaseapp.com",
  projectId: "test-6865c",
  storageBucket: "test-6865c.appspot.com",
  messagingSenderId: "978300373527",
  appId: "1:978300373527:web:84fbc29e6aa5e580226a52",
};
admin.initializeApp(firebaseConfig);
const registrationToken = "LOsdkmW5T01-ahm63uuPpZTiHzhI0vBon7YsvNxU88o";
const app = express();
const db = admin.firestore();
app.use(cors);

app.post("/task", async (req, res) => {
  if (req.body.status === "done") {
    await db.collection("tasks").doc(req.body.id).update({ status: "done" });
    sendPushNotification(req.body.fcmToken, "Task done!", "go check it out");
    res.json({ result: `Message with ID: ${req.body.id} updated.` });
  }
  if (req.body.status === "delete") {
    await db.collection("tasks").doc(req.body.id).delete();
    res.json({ result: `Message with ID: ${req.body.id} deleted.` });
  }
  if (req.body.status === "new") {
    await db.collection("tasks").add({
      task: req.body.task,
      status: "pending",
      fcmToken: req.body.fcmToken,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ result: "New task added!" });
  }
});

app.get("/test", (req, res) => {
  res.send("hello world!");
});

const sendPushNotification = (token, title, body) => {
  var message = {
    to: token,

    data: null,
    notification: {
      title: title,
      body: body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }
  });
};

exports.api = functions.https.onRequest(app);
