import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, database } from '../FirebaseConfig';
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  User as FirebaseAuthUser 
} from 'firebase/auth';
import { ref, set, get, update, serverTimestamp } from 'firebase/database';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Platform } from 'react-native';
import {User} from '../types'

WebBrowser.maybeCompleteAuthSession();



interface AuthContextType {
  user: FirebaseAuthUser | null;
  userData: User | null; 
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Sử dụng Client IDs trực tiếp --- 
const GOOGLE_CLIENT_ID = "178517372667-5ih9rne9t2o9g9gntfsu9tablg6fgrkj.apps.googleusercontent.com";
const FACEBOOK_APP_ID = "1333261937881551"; 
// ---------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID, 
    webClientId: GOOGLE_CLIENT_ID, 
    androidClientId: GOOGLE_CLIENT_ID, 
  });

  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);
      if (firebaseUser) {
        const dbUserData = await getUserDataFromDatabase(firebaseUser.uid);
        setUserData(dbUserData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe; 
  }, []);


  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (googleResponse?.type === 'success') {
        const { id_token } = googleResponse.params;
        if (id_token) {
           setLoading(true);
           try {
            const credential = GoogleAuthProvider.credential(id_token);
            const userCredential = await signInWithCredential(auth, credential);
            await handleSuccessfulLogin(userCredential.user, 'google', userCredential.user.providerData[0]?.uid || userCredential.user.uid);
           } catch (error) {
             console.error("Firebase Google Sign In Error:", error);
           } finally {
             setLoading(false);
           }
        } else {
          console.warn("Google Auth Success but no id_token received");
        }
      } else if (googleResponse?.type === 'error') {
        console.error("Google Auth Error:", googleResponse.error);
      }
    };

    handleGoogleResponse();
  }, [googleResponse]);

  useEffect(() => {
     const handleFacebookResponse = async () => {
       if (facebookResponse?.type === 'success') {
         const { access_token } = facebookResponse.params;
         if (access_token) {
           setLoading(true);
           try {
             const credential = FacebookAuthProvider.credential(access_token);
             const userCredential = await signInWithCredential(auth, credential);
             await handleSuccessfulLogin(userCredential.user, 'facebook', userCredential.user.providerData[0]?.uid || userCredential.user.uid);
           } catch (error) {
             console.error("Firebase Facebook Sign In Error:", error);
           } finally {
             setLoading(false);
           }
         } else {
          console.warn("Facebook Auth Success but no access_token received");
         }
       } else if (facebookResponse?.type === 'error') {
         console.error("Facebook Auth Error:", facebookResponse.error);
       }
     };

     handleFacebookResponse();
  }, [facebookResponse]);

  const handleSuccessfulLogin = async (firebaseUser: FirebaseAuthUser, provider: 'google' | 'facebook', oauthId: string) => {
    const userRef = ref(database, `users/${firebaseUser.uid}`);
    try {
      const snapshot = await get(userRef);
      const now = serverTimestamp(); 

      if (!snapshot.exists()) {
        const newUser: User = {
          fullname: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          oauthProvider: provider,
          oauthId: oauthId,
          bio: "",
          followers: {},
          following: {},
          createdAt: now,
          updatedAt: now,
          lastLogin: now,
        };
        await set(userRef, newUser);
        setUserData(newUser); 
        console.log(`New user created in DB: ${firebaseUser.uid}`);
      } else {
        const existingData = snapshot.val() as User;
        const updates: Partial<User> = {
            lastLogin: now,
            updatedAt: now,
        };
        if (firebaseUser.photoURL && firebaseUser.photoURL !== existingData.avatar) {
            updates.avatar = firebaseUser.photoURL;
        }
        if (firebaseUser.displayName && firebaseUser.displayName !== existingData.fullname) {
            updates.fullname = firebaseUser.displayName;
        }

        await update(userRef, updates);

        const updatedDbData = await getUserDataFromDatabase(firebaseUser.uid);
        setUserData(updatedDbData);
        console.log(`User login updated in DB: ${firebaseUser.uid}`);
      }
    } catch (error) {
      console.error("Error handling user data in DB:", error);
    }
  };

  const getUserDataFromDatabase = async (userId: string): Promise<User | null> => {
    const userRef = ref(database, `users/${userId}`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val() as User;
      } else {
        console.warn(`User data not found in DB for uid: ${userId}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data from DB:", error);
      return null;
    }
  };

  const signInWithGoogle = async () => {
    if (!googleRequest) {
      console.error("Google Auth Request not ready");
      return;
    }
    try {
      await googlePromptAsync();
    } catch (error) {
      console.error("Error calling googlePromptAsync:", error);
    }
  };

  const signInWithFacebook = async () => {
    if (!facebookRequest) {
      console.error("Facebook Auth Request not ready");
      return;
    }
    try {
      await facebookPromptAsync();
    } catch (error) {
      console.error("Error calling facebookPromptAsync:", error);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) { 
      console.error('Logout error:', error);
    } finally {
        setLoading(false);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    userData,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value: authContextValue }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
