import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDVa7qtEUjOjYq3AvqJme6GO40AhHW6eA0",
  authDomain: "quiniela-mundial-84bbb.firebaseapp.com",
  projectId: "quiniela-mundial-84bbb",
  storageBucket: "quiniela-mundial-84bbb.appspot.com",
  messagingSenderId: "616199063502",
  appId: "1:616199063502:web:6e1e561161bcafe9120d9f",
  measurementId: "G-5V8CZXWQTD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

//Messaging
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export const getTokenFirebase = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BCzXBPByzolwo4ZXOvVp_i15VpGCQprFd9HVFRNdW_ULXxqztKUCi6i3coXe6GGD6pyPVKkaYEjoABD3CDvqDu0",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
