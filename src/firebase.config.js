import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnaI7dfHWN1nDIQYwslbubTgKHofdaDcU",
  authDomain: "school-frontend-v1.firebaseapp.com",
  projectId: "school-frontend-v1",
  storageBucket: "school-frontend-v1.appspot.com",
  messagingSenderId: "734325480312",
  appId: "1:734325480312:web:0d54843d1526f7cfd6068d",
  measurementId: "G-GL2EGZ9LW2",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
