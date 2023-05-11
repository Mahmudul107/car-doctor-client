import React, { createContext, useState } from 'react';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config'

export const AuthCOntext = createContext()
const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const authInfo = {
    
    }


    return (
        <AuthCOntext.Provider value={authInfo}>
            {children}
        </AuthCOntext.Provider>
    );
};

export default AuthProvider;