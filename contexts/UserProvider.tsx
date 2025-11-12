import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { Alert } from "react-native";

type UserProviderProp = {
  children: React.ReactNode;
};

export type AuthProp = {
  email: string;
  password: string;
  name?: string;
};

export function UserProvider({ children }: UserProviderProp) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  //   async function login({ email, password }: AuthProp) {}
  //   async function signup({ email, password }: AuthProp) {}
  //   async function logout() {}

  //   async function signup({ email, password }: AuthProp) {
  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       setUser(userCredential.user);
  //       console.log("✅ User signed up:", userCredential.user);
  //       Alert.alert("Success", "Account created successfully!");
  //     } catch (error: any) {
  //       console.error("❌ Signup failed:", error.message);
  //       Alert.alert("Signup Failed", error.message);
  //     }
  //   }

  async function signup({ email, password, name }: AuthProp) {
    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      setUser(firebaseUser);

      // 2️⃣ Create a Firestore document for this user
      await setDoc(doc(db, "users", firebaseUser.uid), {
        email,
        name: name || "", // optional name
        createdAt: new Date(), // store signup date
        bio: "", // you can add more fields here
        avatar: "", // default avatar
      });

      console.log("✅ User signed up and profile created:", firebaseUser.uid);
      Alert.alert("Success", "Account created successfully!");
    } catch (error: any) {
      //   console.error("❌ Signup failed:", error.message);
      throw Error(error.message);
      Alert.alert("Signup Failed", error.message);
    }
  }

  // 🔐 Login function
  async function login({ email, password }: AuthProp) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("✅ User logged in:", userCredential.user);
      Alert.alert("Welcome", "Logged in successfully!");
    } catch (error: any) {
      throw Error(error.message);
      Alert.alert("Login Failed", error.message);
    }
  }

  // 🚪 Logout function
  async function logout(): Promise<void> {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert("Logged Out", "You’ve been logged out successfully.");
    } catch (error: any) {
      //   console.error("Logout failed:", error.message);
      throw Error(error.message);
      Alert.alert("Logout Failed", error.message);
    }
  }

  // 🧠 Watch authentication state (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch Firestore user data
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}
