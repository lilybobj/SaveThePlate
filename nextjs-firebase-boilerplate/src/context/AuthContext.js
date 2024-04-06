'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';

// Initialize Firebase auth instance
const auth = getAuth(firebase_app);

// Create the authentication context
export const AuthContext = createContext( {} );

// Custom hook to access the authentication context
export const useAuthContext = () => useContext( AuthContext );

export function AuthContextProvider( { children } ) {
  // Set up state to track the authenticated user and loading status
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect( () => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        // User is signed in
        setUser( user );
      } else {
        // User is signed out
        setUser( null );
      }
      // Set loading to false once authentication state is determined
      setLoading( false );
    } );

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, [] );

  // the logout function
  const logout = async () => {
    try {
      await signOut(auth);  // Sign out the current user
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };
  
  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
