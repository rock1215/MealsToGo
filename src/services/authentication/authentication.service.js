import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const loginRequest = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerRequest = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const authChanged = (completion) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, completion);
};

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};
