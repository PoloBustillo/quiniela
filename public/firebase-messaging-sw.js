// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyDVa7qtEUjOjYq3AvqJme6GO40AhHW6eA0",
  authDomain: "quiniela-mundial-84bbb.firebaseapp.com",
  projectId: "quiniela-mundial-84bbb",
  storageBucket: "quiniela-mundial-84bbb.appspot.com",
  messagingSenderId: "616199063502",
  appId: "1:616199063502:web:6e1e561161bcafe9120d9f",
  measurementId: "G-5V8CZXWQTD",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle =
      "BG - " + (payload.notification.title || "Background Message Title");
    const notificationOptions = {
      body: payload.notification.body || "Background Message body.",
      icon: "/firebase-logo.png",
      data: payload.data,
      // data: {
      //   ...payload.data,
      //   locator: 'http://localhost:3000/CoachMyProfile'},
      tag: "bg",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
