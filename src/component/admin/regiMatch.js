import React, { useEffect, useState } from "react";
import '../../css/admin.css';
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import { Form, Input, Button } from 'reactstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import { dbService, storageService } from '../../fbase';

const RegiMatch = () => {
  const [searchWinner,setSearchWinner] = useState("");
  const [searchLoser,setSearchLoser] = useState("");
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dbService.collection("user").onSnapshot(snapshot => {
      const userArray = [];
      snapshot.docs.map(doc => (
        userArray.push(doc.data().name)
      ))
      setAllUsers(userArray);
    })
  }, [])

  const winnerChange = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(winners.length>=2){
        alert('2명이하만')
        setSearchWinner('');
        return;
      } else {  //2명 이하이고
        if(allUsers.includes(searchWinner)){  //유저목록에 있으면
          if(winners.includes(searchWinner)){ //근데 이미 등록했으면
            alert('이미 등록한 유저입니다');
            setSearchWinner('');
          } else {
            setWinners(winners.concat(searchWinner))
            setSearchWinner('');
          }
        } else { //등록된 유저가 아니면
          alert('등록된 유저가 아닙니다')
          setSearchWinner('');
        }
      }
    } else { 
      setSearchWinner(e.target.value);
    }
  };

  const loserChange = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(losers.length>=2){
        alert('2명이하만')
        setSearchLoser('');
        return;
      } else {  //2명 이하이고
        if(allUsers.includes(searchLoser)){  //유저목록에 있으면
          if(losers.includes(searchLoser)){ //근데 이미 등록했으면
            alert('이미 등록한 유저입니다');
            setSearchLoser('');
          } else {
            setLosers(losers.concat(searchLoser))
            setSearchLoser('');
          }
        } else { //등록된 유저가 아니면
          alert('등록된 유저가 아닙니다')
          setSearchLoser('');
        }
      }
    } else { 
      setSearchLoser(e.target.value);
    }
  };

  const matchSubmit = async(e) => {
    if(winners.length===0){
      alert('승자를 입력하세요');
      return;
    }
    if(losers.length===0){
      alert('패자를 입력하세요');
      return;
    }
    e.preventDefault();

    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    const time = (year + '/' + month + '/' + date + '-' + hours + ':' + minutes + ':' + seconds)

    const match = {
      winners: winners,
      losers: losers,
      date: startDate,
      write_time: time
    }
    console.log(match);
    await dbService.collection("game").doc(startDate+''+time).set(match);
    setSearchWinner('');
    setSearchLoser('');

  }
  const regiMatch = (
    <div className='userMaker'>
      <Form className="noteWriter">
        <div className="needMargin matchResult">
          <span>
            <div>승</div>
            <Input type="text" name='win' value={searchWinner} onChange={winnerChange} onKeyPress={winnerChange}/>
            <div className="users">
              <div className="flexWrap">
                {winners.map(i => (
                  <span className="targetUser">{i}</span>
                ))}
              </div>
            </div>
          </span>
          <span className="versus"> VS </span>
          <span>
            <div>패</div>
            <Input type="text" name='lose' value={searchLoser} onChange={loserChange} onKeyPress={loserChange}/>
            <div className="users">
              <div className="flexWrap">
                {losers.map(i => (
                  <span className="targetUser">{i}</span>
                ))}
              </div>
            </div>
          </span>
        </div>
        <div className="needMargin">
          <span className="needMargin">시합일</span>
          <DatePicker selected={startDate} dateFormat="Pp" onChange={date => setStartDate(date)} />
        </div>
        <div className="needMargin">{allUsers}</div>
        <Button className="needMargin" onClick={matchSubmit}>전송</Button>
      </Form>
    </div>
  );

  return (
    <div className="Box">
      {regiMatch}
    </div>
  );
};

export default RegiMatch;
