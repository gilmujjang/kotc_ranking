import { authService } from "../fbase";
import react from "react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true)
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      let data;
        data = await authService.signInWithEmailAndPassword(email, password)
  
    } catch(error){
      setError(error.message);
    }
  };

  return(
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className="container">
        <input 
        name = "email" 
        type="email" 
        placeholder="Email" 
        required 
        value={email}
        onChange={onChange}
        className="authInput"/>

        <input 
        name = "password" 
        type="password" 
        placeholder="Password" 
        required 
        value={password}
        onChange={onChange}
        className="authInput"/>

        <input 
          className="authInput authSubmit"
          type="submit" 
          value="Log In">
        </input>
        {error && <span className="authError">{error}</span>}
      </form>
    </div>
  )
}

export default Auth;