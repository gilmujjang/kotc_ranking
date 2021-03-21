import React from 'react';
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
      <span className="headerText">KOTC 랭킹시스템 관리자 페이지</span>
      <i class="fas fa-sign-out-alt fa-2x logout needMargin"  onClick={onLogOutClick}></i>
    </div>
  );
};

export default Header;
