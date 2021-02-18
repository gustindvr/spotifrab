import firebaseApp from "./firebase";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uid){
  const response = await db.collection("Admins").doc(uid).get();
  return response.exists; 
}