import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig/firebaseConfig";
import useAxiosPublic from "../CustomHooks/useAxiosPublic";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const userEmail = { email: user?.email };
        axiosPublic.post("/jwt", userEmail).then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
        });
      } else {
        localStorage.removeItem("token");
      }
    });
    return () => {
      return unSubscribe;
    };
  }, []);
  const userInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
