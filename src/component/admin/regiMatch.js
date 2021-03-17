import React, { useEffect, useState } from "react";
import '../../css/admin.css';
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import { Form, Input, Button } from 'reactstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import { dbService, storageService } from '../../fbase';

const CreateUser = () => {
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
      if(winners.length>=2){
        alert('2명이하만')
        return
      }
      setWinners(winners.concat(searchWinner))
      setSearchWinner('');
      e.preventDefault();
    } else {
      setSearchWinner(e.target.value);
    }
  };

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
            <Input type="text" name='lose'/>
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
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="needMargin">{allUsers}</div>
        <Button className="needMargin">전송</Button>
      </Form>
    </div>
  );

  return (
    <div className="Box">
      {regiMatch}
    </div>
  );
};

export default CreateUser;
