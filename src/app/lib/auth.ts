import { auth, db } from "@/app/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  if (password !== confirmPassword) {
    throw new Error("Password dan konfirmasi password tidak sama");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: username });

  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    createdAt: new Date().toISOString(),
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
