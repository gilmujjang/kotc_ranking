import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserDetail = ({ allUsersByTime, setIsDetailOn, userKey }) => {
    
    const info = (
        <>
            <div className="detail--profile">
                <img src={allUsersByTime[userKey].attachmentUrl} alt="detail profile" />
            </div>
            <div>
                <span className="detail__name">{allUsersByTime[userKey].name}</span>
                <span className="detail__department">{allUsersByTime[userKey].department}과</span>
                <span className="detail__status">{allUsersByTime[userKey].studentid}학번 / {allUsersByTime[userKey].status}</span>
            </div>
        </>
    )

    function closeDetail(e) {
        setIsDetailOn(false)
    }

    return (
        <div className="detailContainer">
            <div className="top">
                <div className="top--left">
                    {info}
                </div>
                <div className="top--right">
                    {/* 승패 퍼센티지 */}
                    {/* mmr 퍼센티지 */}
                </div>
            </div>
            <div className="bottom">
                {/* 그래프 */}
            </div>
            <FontAwesomeIcon icon={faTimes} className="close" onClick={closeDetail}/>
        </div>
    );
}

export default UserDetail;