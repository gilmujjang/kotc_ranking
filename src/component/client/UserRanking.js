import React, { useEffect, useRef, useState } from 'react';
import { dbService } from '../../fbase'

const UserRanking = () => {

    const [loadCount, setLoadCount] = useState(9);
    const [users, setUsers] = useState([]);

    // 02 재학생만 가져오기
    const onScrollTarget = useRef();
    const getRanking = async () => {
        await dbService.collection('user').where('status', '==', '재학').orderBy('rating').get() //.orderBy('rating') 나중에 색인 다시 만들어야 함
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

    // 06 rankingContainer 스크롤 했을 때
    const onScrollAction = (e) => {
        // const rankingContainer = e.target
        
        // if(
        //     rankingContainer.scrollTop + rankingContainer.clientHeight
        //     >= rankingContainer.scrollHeight) {
        //         setLoadCount(loadCount + 5)
        //         console.log(loadCount);
        // }
    }

    return (
        <div className="rankingContainer" ref={onScrollTarget} onScroll={onScrollAction}>
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

