import React from 'react';

const Nav = () => {
    const userInfo = 'hello';
    return (
        <div id="nav">
            <ul>
                <li><a href="/client/">재학생 랭킹</a></li>
                <li><a href="/client/">신입생 랭킹</a></li>
                <li><a href="/client/">찍먹파</a></li>
                <li><a href="/client/">부먹파</a></li>
            </ul>
            {userInfo}
        </div>
    )
};

export default Nav;