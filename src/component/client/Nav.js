import React, { useState } from 'react';
import firebase from 'firebase/app'

const Nav = () => {

    const [signedUser, setSignedUser] = useState([]);

    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
            setSignedUser(user);
        } else {
            // 로그아웃 상태일 때 .signedUser 전체를 새로운 {}로 묶어서 null이 되도록 하기
        }
    });

    return (
        <div id="nav">
            <ul>
                <li><a href="/client/">재학생 랭킹</a></li>
                <li><a href="/client/">신입생 랭킹</a></li>
                <li><a href="/client/">찍먹파</a></li>
                <li><a href="/client/">부먹파</a></li>
            </ul>
            <div className="signedUser">
                <img className="signedUser--img" src={signedUser.photoURL} alt=""></img>
                <div className="signedUser--txt">
                    <p className="signedUser__name">{signedUser.displayName}</p>
                    <p className="signedUser__email">{signedUser.email}</p>
                </div>
            </div>
            <footer>
                <p className="footer--top">&copy; 2021, Built by</p>
                <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
            </footer>
        </div>
    )
};

export default Nav;