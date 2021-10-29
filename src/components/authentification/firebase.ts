import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgxkBGWL04FIKW-M8sQRtMQThyfNSbAXA",
  authDomain: "training-routine-development.firebaseapp.com",
  projectId: "training-routine-development",
  storageBucket: "training-routine-development.appspot.com",
  messagingSenderId: "657954202748",
  appId: "1:657954202748:web:a8c96cd374c98b342ad5f9",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
