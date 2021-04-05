import React, { useEffect, useState } from 'react';
import { ResponsiveLine  } from '@nivo/line'
import UserDetail from './UserDetail';

const UserInfo = ({ allUsers, allGame }) => {
  const allUsersByTime = [...allUsers];
  allUsersByTime.sort(function(a,b){
    return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
  })
  const [mapList, setMapList] = useState([])
  const [isDetailOn, setIsDetailOn] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [userKey, setUserKey] = useState(0)
  // const [userDetail, setUserDetail] = useState({})


  function showDetail(e) {
    setIsDetailOn(true)
    setUserKey(e.target.dataset.num)
  }

  const userInfo = mapList.map((user,index) => (
    <div className="userInfo" key={index}>
      <div>
        <img className="userImage" src={user.attachmentUrl} onClick={showDetail} data-num={index} key={index} alt="profile--detail"/>
      </div>
      <div className="userInfoRightSide">
        <div className="userInfoUpSide">
          <div>
            <span className="studentName">{user.name}</span>
            <span className="userStatus">{user.status}</span>
          </div>
          <div className="win_lose">
            <div className="department">{user.game_win}승</div>
            <div className="department">{user.game_lose}패</div>
          </div>
        </div>
        <div className="userInfoBottomSide">
          <span className="rating">레이팅: {user.rating}</span>
          <span className="department">{user.department}</span>
          {/* <span className="department">승률: {Math.round(((user.game_win)/(user.game_all))*100)}%</span> */}
        </div>
      </div>
    </div>
  ))

  function onChangeAction(e) {
    setFilterName(e.target.value)
  }

  useEffect(() => {
    if(filterName) {
      setMapList(allUsersByTime.filter(el => el.name === filterName))
    } else {
      setMapList(allUsersByTime.sort(function(a,b){
        return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
      }))
    }
  }, [filterName])

  return (
    <>
      <input type="text" className="filter--info" placeholder="text name..." onChange={onChangeAction} />
      <div className="usersInformation">
        <div className="userList">
          {userInfo}
        </div>
        {isDetailOn && <UserDetail setIsDetailOn={setIsDetailOn} allUsersByTime={allUsersByTime} userKey={userKey} />}
      </div>
    </>
  )
};

export default UserInfo;









// const data = [
//   {
//     "id": "japan",
//     "color": "hsl(314, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 99
//       },
//       {
//         "x": "helicopter",
//         "y": 142
//       },
//       {
//         "x": "boat",
//         "y": 88
//       },
//       {
//         "x": "train",
//         "y": 100
//       },
//       {
//         "x": "subway",
//         "y": 283
//       },
//       {
//         "x": "bus",
//         "y": 30
//       },
//       {
//         "x": "car",
//         "y": 264
//       },
//       {
//         "x": "moto",
//         "y": 290
//       },
//       {
//         "x": "bicycle",
//         "y": 238
//       },
//       {
//         "x": "horse",
//         "y": 166
//       },
//       {
//         "x": "skateboard",
//         "y": 264
//       },
//       {
//         "x": "others",
//         "y": 287
//       }
//     ]
//   },
//   {
//     "id": "france",
//     "color": "hsl(99, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 242
//       },
//       {
//         "x": "helicopter",
//         "y": 49
//       },
//       {
//         "x": "boat",
//         "y": 182
//       },
//       {
//         "x": "train",
//         "y": 0
//       },
//       {
//         "x": "subway",
//         "y": 285
//       },
//       {
//         "x": "bus",
//         "y": 218
//       },
//       {
//         "x": "car",
//         "y": 15
//       },
//       {
//         "x": "moto",
//         "y": 2
//       },
//       {
//         "x": "bicycle",
//         "y": 235
//       },
//       {
//         "x": "horse",
//         "y": 72
//       },
//       {
//         "x": "skateboard",
//         "y": 49
//       },
//       {
//         "x": "others",
//         "y": 184
//       }
//     ]
//   }
// ]

// {/* <div className="chartSample">
//             <ResponsiveLine
//               data={data}
//               margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//               xScale={{ type: 'point' }}
//               yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
//               axisTop={null}
//               axisRight={null}
//               axisBottom={{
//                   orient: 'bottom',
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: 'transportation',
//                   legendOffset: 36,
//                   legendPosition: 'middle'
//               }}
//               axisLeft={{
//                   orient: 'left',
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: 'count',
//                   legendOffset: -40,
//                   legendPosition: 'middle'
//               }}
//               enableGridX={false}
//               lineWidth={3}
//               pointSize={10}
//               pointColor={{ theme: 'background' }}
//               pointBorderWidth={2}
//               pointBorderColor={{ from: 'serieColor' }}
//               pointLabelYOffset={-16}
//               isInteractive={false}
//               enableCrosshair={false}
//               legends={[
//                   {
//                       anchor: 'bottom-right',
//                       direction: 'column',
//                       justify: false,
//                       translateX: 107,
//                       translateY: -15,
//                       itemsSpacing: 2,
//                       itemDirection: 'left-to-right',
//                       itemWidth: 88,
//                       itemHeight: 20,
//                       itemOpacity: 0.75,
//                       symbolSize: 12,
//                       symbolShape: 'circle',
//                       symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
//                       effects: [
//                           {
//                               on: 'hover',
//                               style: {
//                                   itemBackground: 'rgba(0, 0, 0, .03)',
//                                   itemOpacity: 1
//                               }
//                           }
//                       ]
//                   }
//               ]}
//             />
//           </div> */}