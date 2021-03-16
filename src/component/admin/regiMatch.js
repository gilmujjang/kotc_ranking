import { React, useState } from 'react';
import '../../css/admin.css';
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import { Form, Input, Button, ToastBody } from 'reactstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import { dbService, storageService } from '../../fbase';

const CreateUser = () => {
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const regiMatch = (
    <div className='userMaker'>
      <Form className="noteWriter">
        <div className="needMargin matchResult">
          <span>
            <div>승</div>
            <Input type="text" name='win'/>
          </span>
          <span className="versus"> VS </span>
          <span>
            <div>패</div>
            <Input type="text" name='lose'/>
          </span>
        </div>
        <div className="needMargin">
          <span className="needMargin">시합일</span>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
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
