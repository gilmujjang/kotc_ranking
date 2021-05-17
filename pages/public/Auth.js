import { authService,firebaseInstance } from "../../src/fbase";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Icon } from 'semantic-ui-react'
import styles from '../../src/admin/css/Admin.module.css'
import classNames from 'classnames';

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
    history.push("/kotc_router")
  };

  return(
    <div className={styles.authContainer}>
      <Icon fitted name="google icon" style={{ marginBottom: 30 }} color={"#04AAFF"}></Icon>

      <div> 구글 로그인만 가능 밑에 Continue with Google 클릭하셈</div>
      <form onSubmit={onSubmit} className={styles.container}>
        <input 
        name = "email" 
        type="email" 
        placeholder="Email" 
        required 
        value={email}
        onChange={onChange}
        className={styles.authInput}/>

        <input 
        name = "password" 
        type="password" 
        placeholder="Password" 
        required 
        value={password}
        onChange={onChange}
        className={styles.authInput}/>

        <input 
          className={classNames({["authInput"]: true, ["authSubmit"]: true})}
          type="submit" 
          value="Log In">
        </input>
        {error && <span className={styles.authError}>{error}</span>}
      </form>
      <div className={styles.authBtns}>
        <button onClick={onSocialClick} name="google" className={styles.authBtn}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  )
}

export default Auth;