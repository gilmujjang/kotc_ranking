import { React, useState } from 'react';
import '../../css/admin.css';
import { Form, Input, Button } from 'reactstrap';
import { dbService } from '../../fbase';


const RegiMatch = () => {
  const [inputs, setInputs] = useState({
    name: '',
    studentid:'',
    department:'',
    rating:'',
    status:''
  });

  const { name, studentid, department, rating, status} = inputs;
  const handleChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userProfile = {
      name: name,
      studentid: studentid,
      department: department,
      rating: rating,
      status: status,
    }
    await dbService.collection("user").add(userProfile);
    console.log(name);
    console.log(studentid);
    console.log(department);
    console.log(rating);
    console.log(status);
  };

  const userMaker = (
    <div className='userMaker'>
      <Form className="noteWriter">
        <div className="messageTargetBox needMargin">
          <span>이름</span>
          <Input type="text" name='name' onChange={handleChange}/>
        </div>
        <div className="messageTargetBox needMargin">
          <span>학번</span>
          <Input type="text" name='studentid' onChange={handleChange}/>
        </div>
        <div className="messageTargetBox needMargin">
          <span>학과</span>
          <Input type="text" name='department' onChange={handleChange}/>
        </div>
        <div className="messageTargetBox needMargin">
          <span>초기레이팅</span>
          <Input type="text" name='rating' onChange={handleChange}/>
        </div>
        <div className="messageTargetBox needMargin">
          <span>상태</span>
          <Input type="text" name='status' onChange={handleChange}/>
        </div>
        <Button onClick={handleSubmit}>전송</Button>
      </Form>
    </div>
  );

  return (
    <div className="Box">
      {userMaker}
    </div>
  );
};

export default RegiMatch;
