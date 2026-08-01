import { createContext,useContext,useEffect,useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext=createContext();

export function AuthProvider({children}){
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,user=>{
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  },[]);

  async function signup(email,password,name){
    const {user}=await createUserWithEmailAndPassword(auth,email,password);

    if(name) await updateProfile(user,{displayName:name});

    await user.reload();
    setUser(auth.currentUser);

    return auth.currentUser;
  }

  async function login(email,password,remember=true){
    await setPersistence(
      auth,
      remember?browserLocalPersistence:browserSessionPersistence
    );

    const {user}=await signInWithEmailAndPassword(auth,email,password);

    setUser(user);
    return user;
  }

  async function forgotPassword(email){
    await sendPasswordResetEmail(auth,email);
  }

  async function updateUserProfile(data){
    if(!auth.currentUser)return;

    await updateProfile(auth.currentUser,data);
    await auth.currentUser.reload();

    setUser(auth.currentUser);
  }

  async function logout(){
    await signOut(auth);
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      forgotPassword,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}