import { authService,firebaseInstance } from "../fbase";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onSocialClick = async(event) => {
    const {target:{name},
    } = event;
    let provider;
    if(name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

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
    await authService.signOut();
    try {
      let data;
        data = await authService.signInWithEmailAndPassword(email, password)
  
    } catch(error){
      setError(error.message);
    }
    history.push("/")
  };

  return(
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faGoogle}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <div> 구글 로그인만 가능 밑에 Continue with Google 클릭하셈</div>
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
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  )
}

export default Auth;