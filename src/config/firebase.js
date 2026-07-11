import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Add a new suggestion
export const addSuggestion = async (text, author) => {
  try {
    const docRef = await addDoc(collection(db, "suggestions"), {
      text,
      author: author || "Anon",
      votes: 0,
      createdAt: new Date().toISOString(),
      rot: Math.random() * 6 - 3,
    });
    return { id: docRef.id, text, author: author || "Anon", votes: 0, rot: Math.random() * 6 - 3 };
  } catch (error) {
    console.error("Error adding suggestion:", error);
    throw error;
  }
};

// Get all suggestions
export const getSuggestions = async () => {
  try {
    const q = query(collection(db, "suggestions"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

// Update vote count
export const updateVotes = async (docId, newVoteCount) => {
  try {
    const docRef = doc(db, "suggestions", docId);
    await updateDoc(docRef, { votes: newVoteCount });
  } catch (error) {
    console.error("Error updating votes:", error);
    throw error;
  }
};
