import { React, useState } from 'react';
import '../../css/admin.css';
import { Form, Input, Button } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: '',
    studentid:'',
    department:'',
    start_rating:'',
    rating:'',
    status:''
  });
  const [attachment, setAttachment] = useState("");


  const { name, studentid, department, start_rating, rating, status} = inputs;

  const handleChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const userMakeSubmit = async(e) => {
    e.preventDefault();
    if(name === ''){
      alert("이름을 입력하세요")
      return;
    }
    if(studentid === ''){
      alert("학번을 입력하세요")
      return;
    }
    if(department === ''){
      alert("학과를 입력하세요")
      return;
    }
    if(start_rating === ''){
      alert("초기 레이팅을 입력하세요")
      return;
    }
    if(status === ''){
      alert("재학상태를 입력하세요")
      return;
    }
    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = storageService.ref().child(name);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초

    const time = (year + '/' + month + '/' + date + '-' + hours + ':' + minutes + ':' + seconds)

    const userProfile = {
      name: name,
      studentid: parseInt(studentid),
      department: department,
      start_rating: parseInt(start_rating),
      rating: parseInt(start_rating),
      status: status,
      time:time,
      attachmentUrl,
    }
    await dbService.collection("user").doc(name).set(userProfile);

    setAttachment("");
    setInputs({
      name: '',
      studentid:'',
      department:'',
      start_rating:'',
      rating:'',
      status:''
    })
  };

  const onClearAttachment = () => setAttachment("");

  const onFileChange = (event) => {
    const {target:{files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  };

  //위에는 함수 밑에는 jsx
  
  const userMaker = (
    <div className='userMaker'>
      <Form className="noteWriter">
        <div className="userProfileImage">
          <span>프사</span>
          <Input type="file" name="file" id="exampleFile" onChange={onFileChange}/>
        </div>
        {attachment && (
        <div className="factoryForm__attachment">
          <img className="profileImg" src={attachment} alt="profile image"/>
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
          </div>
        </div>
      )}
        <div className="needMargin">
          <span>이름</span>
          <Input type="text" name='name' onChange={handleChange} value={name}/>
        </div>
        <div className="needMargin">
          <span>학번</span>
          <Input type="text" name='studentid' onChange={handleChange} value={studentid}/>
        </div>
        <div className="needMargin">
          <span>학과</span>
          <Input type="text" name='department' onChange={handleChange} value={department}/>
        </div>
        <div className="needMargin">
          <span>초기레이팅</span>
          <Input type="text" name='start_rating' onChange={handleChange} value={start_rating}/>
        </div>
        <div className="needMargin">
          <span>상태</span>
          <Input type="text" name='status' onChange={handleChange} value={status}/>
        </div>
        <Button className="needMargin" onClick={userMakeSubmit}>전송</Button>
      </Form>
    </div>
  );

  return (
    <div className="Box">
      {userMaker}
    </div>
  );
};

export default CreateUser;
