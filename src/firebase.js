// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFUn7-HV9z2h7tzNtuOzkM9Y18Xf7IdZo",
  authDomain: "test-6865c.firebaseapp.com",
  projectId: "test-6865c",
  storageBucket: "test-6865c.appspot.com",
  messagingSenderId: "978300373527",
  appId: "1:978300373527:web:84fbc29e6aa5e580226a52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

const publicKey =
  "BH77myNgotRStdXO1T83bzgHn3Mnt7Dq5goV4B7q9ivQJRaAjOI6OHgsC1Jf6kftVXn5zi92BR4zNcFZuhbml6Y";
export const getFcmToken = async () => {
  const messaging = getMessaging();
  let currentToken = "";
  try {
    currentToken = await getToken(messaging, { vapidKey: publicKey });
  } catch (error) {
    console.log("An error occured while retrieving messaging token ", error);
  }
  return currentToken;
};
