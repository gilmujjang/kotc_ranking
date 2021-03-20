import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'

const Nav = () => {

    const [signedUser, setSignedUser] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setSignedUser(user);
        });
    }, []);
    // contextAPI를 사용해서 할 수도 있으니 참고해 놓을 것.
    
    return (
        <div id="nav">
            <ul>
                <li><a href="/client/">재학생 랭킹</a></li>
                <li><a href="/client/">신입생 랭킹</a></li>
                <li><a href="/client/">찍먹파</a></li>
                <li><a href="/client/">부먹파</a></li>
            </ul>
            {signedUser &&
                <div className="signedUser">
                <img className="signedUser--img" src={signedUser.photoURL} alt=""></img>
                <div className="signedUser--txt">
                    <p className="signedUser__name">{signedUser.displayName}</p>
                    <p className="signedUser__email">{signedUser.email}</p>
                </div>
                </div>
            }
            <footer>
                <p className="footer--top">&copy; 2021, Built by</p>
                <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
            </footer>
        </div>
    )
};

export default Nav;