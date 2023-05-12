import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Sign Up user
    const createUser = ( email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

// Sign in user
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    // Log out user
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    // For user haven or not have
    useEffect( ()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            // console.log('Current user:', currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;