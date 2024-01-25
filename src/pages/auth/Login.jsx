import React from "react";
import { auth, provider } from "../../config/firebase-config";

import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const singInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    //console.log(results);

    const userInfo = {
      //this is a object
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true, // is auth user or not
    };

    localStorage.setItem("auth", JSON.stringify(userInfo)); //convert object to string using Json
    navigate("/expense-tracker");
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign in with Google</h1>
        <button className="login-with-google" onClick={singInWithGoogle}>
          Sign in
        </button>
        <h3>
          This is a simple demo app that allow user to track their expense and
          income using firebase
        </h3>
      </div>
    </div>
  );
};

export default Login;
