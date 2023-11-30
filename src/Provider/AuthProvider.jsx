
import React, { createContext, useEffect, useState } from 'react';
import auth from '../config/Firebase.config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [role, setRole] = useState(null);
    const [loading,setLoading]=useState(true)


    const googleProvider=new GoogleAuthProvider()
const axiosPublic=useAxiosPublic()

    const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

const singIn=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

const googleSignIn=()=>{
    return signInWithPopup(auth,googleProvider)
}

const logout=()=>{
    setLoading(true)
    return signOut(auth)
}
const updateUserProfile=(name,photo)=>{
    setLoading(true)
   return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    }
const updateUserProfileImage=(photo)=>{
    setLoading(true)
   return updateProfile(auth.currentUser, {
        photoURL: photo
      })
    }

useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        console.log("currentUser",currentUser)
        if(currentUser){
            const userInfo={
                email:currentUser.email
            }
            console.log(userInfo)
      axiosPublic.post("/jwt",userInfo)
      .then(res=>{
        if(res.data.token){
            // console.log("token",res.data.token)
            localStorage.setItem('access-token',res.data.token)
            setLoading(false)
        }
      })
        }
        else{
      localStorage.removeItem('access-token')
        }
        

        if(currentUser){
            
            fetch(
                `https://swiftship-server.vercel.app/checkuser?email=${currentUser.email}`
              )
                .then((res) => res.json())
                .then((data) => setRole(data.role));
            } else {
              setRole(null);
            }
            setLoading(false);
        
    })
    return ()=>unSubscribe()
},[axiosPublic])

    const authInfo={
           user,
           loading,
           createUser,
           singIn,
           logout,
           updateUserProfile,
           updateUserProfileImage,
           googleSignIn,
           role
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;