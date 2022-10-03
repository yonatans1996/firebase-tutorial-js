importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyDFUn7-HV9z2h7tzNtuOzkM9Y18Xf7IdZo",
  authDomain: "test-6865c.firebaseapp.com",
  projectId: "test-6865c",
  storageBucket: "test-6865c.appspot.com",
  messagingSenderId: "978300373527",
  appId: "1:978300373527:web:84fbc29e6aa5e580226a52",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
