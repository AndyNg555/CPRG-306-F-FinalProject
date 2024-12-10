"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, githubProvider } from "./firebase"; // Use githubProvider from firebase.js

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // GitHub login function with error handling
  const gitHubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return result; // Optionally return the result
    } catch (error) {
      console.error("GitHub login failed:", error.message);
      // Handle the error here (show notification, etc.)
    }
  };

  // Sign out function
  const firebaseSignOut = () => {
    return signOut(auth);
  };

  // Use effect to handle auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the listener
  }, []); // Only run once when the component mounts

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
