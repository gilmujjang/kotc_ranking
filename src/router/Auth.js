import { authService } from "../fbase";
import react from "react";
import { firebaseInstance } from '../fbase';
import AuthForm from "../component/admin/AuthForm"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  
  return(
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
    </div>
  )
}

export default Auth;