import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase'

const UserRanking = () => {
    const LOAD_COUNT = 1;

    const [loadCount, setLoadCount] = useState(LOAD_COUNT)
    const [users, setUsers] = useState([]);

    // 02 재학생만 가져오기
    const getRanking = async () => {
        await dbService.collection('user').where('status', '==', '재학').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // 03 setUsers()로 항목 추가
                const usersListObj = {
                    name: doc.data().name,
                    rating: doc.data().rating,
                    studentId: doc.data().studentid,
                    department: doc.data().department,
                }
                setUsers(users => [...users, usersListObj])
            });
        })
    };
    
    // 01 컴포넌트 마운트
    useEffect(() => {
        getRanking();
    }, [loadCount]);

    // 04 rating 순으로 정렬
    users.sort((a, b) => {
        return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
    });

    // 05 순위 부여
    for(let i = 0; i < users.length; i++) {
        users[i].grade = i + 1;
    }

    // 06 rankingContainer를 스크롤 했을 때
    function onScrollAction() {
        // if(
        //     rankingContainer.scrollTop + rankingContainer.clientHeight
        //     >= rankingContainer.scrollHeight) {
        //         console.log('hello');
        // }
    }
    

    return (
        <div className="rankingContainer" onScroll={onScrollAction}>
            <div className="ranking">
            {users.length > 0 && users.map((users) =>
                <div className="ranking-item" key={users.grade}>
                    <span className="item--left grade">{users.grade}</span>
                    <div className="item--right">
                        <span className="rating">{users.rating}</span>
                        <div className="">
                            <span className="studentName">{users.name}</span>
                            <span className="studentId">{users.studentId}</span>
                            <span className="department">{users.department}</span>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
};

export default UserRanking;

