import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1zaf_bneYi9dxJD_cDUQ1XfXrs8vus8M",
  authDomain: "workflow-9078e.firebaseapp.com",
  projectId: "workflow-9078e",
  storageBucket: "workflow-9078e.firebasestorage.app",
  messagingSenderId: "790334276372",
  appId: "1:790334276372:web:6df5eb03a0d1f8cd5db801",
  measurementId: "G-B9HHFN0VT2"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export async function writeDocs(userPass: string, userName: string) {
    const ref = doc(firestore, "Users", userName);
    await setDoc(ref, {
        user: {
            userName,
            userPass
        }
    })
} 