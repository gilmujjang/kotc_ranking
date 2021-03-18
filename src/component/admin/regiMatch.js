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
  const [gameUser, setGameUser] = useState("");
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
          if(gameUser.includes(searchWinner)){
            alert("이미 등록된 유저입니다")
            setSearchWinner('');
            return;
          }
            setWinners(winners.concat(searchWinner))
            setGameUser(gameUser.concat(searchWinner))
            setSearchWinner('');
          
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
          if(gameUser.includes(searchLoser)){
            alert("이미 등록된 유저입니다")
            setSearchLoser('');
            return;
          }
          setGameUser(gameUser.concat(searchLoser))
          setLosers(losers.concat(searchLoser))
          setSearchLoser('');
        
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
    if(winners.length !== losers.length){
      alert("인원을 맞추시오");
      return;
    }
    e.preventDefault();

    let now = new Date();   
    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1;  // 월
    if(month<10){
      month = 0+''+month
    }
    let date = now.getDate();  // 날짜
    if(date<10){
      date = 0+''+date
    }
    let hours = now.getHours(); // 시
    if(hours<10){
      hours = 0+''+hours
    }
    let minutes = now.getMinutes();  // 분
    if(minutes<10){
      minutes = 0+''+minutes
    }
    let seconds = now.getSeconds();  // 초
    if(seconds<10){
      seconds = 0+''+seconds
    }
    const time = (year + '' + month + '' + date + '' + hours + '' + minutes + '' + seconds)

    year = startDate.getFullYear(); // 년도
    month = startDate.getMonth() + 1;  // 월
    if(month<10){
      month = 0+''+month
    }
    date = startDate.getDate();  // 날짜
    if(date<10){
      date = 0+''+date
    }
    const matchDate = (year + '' + month + '' + date)

    const match = {
      winners: winners,
      losers: losers,
      date: matchDate,
      write_time: time
    }

    await dbService.collection("game").doc(matchDate+'-'+time).set(match);
    setSearchWinner('');
    setSearchLoser('');
    setWinners([]);
    setLosers([]);
  }


  const regiMatch = (
    <div className='userMaker'>
      <Form className="noteWriter">
        <div className="needMargin matchResult">
          <span>
            <div>승</div>
            <Input type="text" name='win' value={searchWinner} onChange={winnerChange} onKeyPress={winnerChange}/>
            <div className="users flexWrap">
              {winners.map(i => (
                <>
                  <span className="targetUser">{i}</span>
                  <i className="fas fa-times-circle winnerSearchCancle"></i>
                </>
              ))}
            </div>
          </span>
          <span className="versus"> VS </span>
          <span>
            <div>패</div>
            <Input type="text" name='lose' value={searchLoser} onChange={loserChange} onKeyPress={loserChange}/>
            <div className="users">
              <div className="flexWrap">
                {losers.map(i => (
                  <>
                  <span className="targetUser">{i}</span>
                  <i className="fas fa-times-circle winnerSearchCancle"></i>
                </>
                ))}
              </div>
            </div>
          </span>
        </div>
        <div className="needMargin">
          <span className="needMargin">시합일</span>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
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
