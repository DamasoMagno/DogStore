import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDy4Y_ItBysLUc5bg7Mn2liDTiwCI3-AH0",
  authDomain: "dog-store-89a4c.firebaseapp.com",
  projectId: "dog-store-89a4c",
  storageBucket: "dog-store-89a4c.appspot.com",
  messagingSenderId: "944347909338",
  appId: "1:944347909338:web:ca14a318e01b87f07369e3",
  measurementId: "G-DMZ9R4521E"
};

const app = initializeApp(firebaseConfig);

export { app }