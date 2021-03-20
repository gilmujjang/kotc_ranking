import React from 'react';
import '../../style.css';
import { authService } from "../../fbase";
import { useHistory } from "react-router-dom";



const Header = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/")
  };
  return (
    <div className="header">
      <span className="headerText">랭킹시스템 관리자 페이지</span>
      <span className="formBtn cancelBtn logOut headerText" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Header;
