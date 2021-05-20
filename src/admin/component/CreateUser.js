import { React, useState } from 'react';
import { dbService, storageService } from '../../fbase';
import styles from '../css/Admin.module.css'

const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: '',
    studentid:'',
    department:'',
    start_rating:'',
    rating:'',
    status:'재학'
  });
  const [attachment, setAttachment] = useState("");


  const { name, studentid, department, start_rating, status} = inputs;

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
      const attachmentRef = storageService.ref().child('userprofile').child(name);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    
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

    const userProfile = {
      name: name,
      studentid: parseInt(studentid),
      department: department,
      start_rating: parseInt(start_rating),
      rating: parseInt(start_rating),
      status: status,
      time:time,
      attachmentUrl,
      game_all:0,
      game_win:0,
      game_lose:0,
    }
    await dbService.collection("kotc").doc("group_data").collection("players").doc(name).set(userProfile);

    setAttachment("");
    setInputs({
      name: '',
      studentid:'',
      department:'',
      start_rating:'',
      rating:'',
      status:'재학'
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
  
  const userMaker = (
    <div className={styles.userMaker}>
      <div className={styles.userProfileImage}>
        <span>프사</span>
        <input type="file" name="file" id="exampleFile" onChange={onFileChange}/>
      </div>
      {attachment && (
      <div className={styles.factoryForm__attachment}>
        <img className={styles.profileImg} src={attachment} alt="profile image"/>
        <div className={styles.factoryForm__clear} onClick={onClearAttachment}>
          <span>Remove</span>
        </div>
      </div>
    )}
      <div className={styles.createuserlist}>
        <span>이름</span>
        <input className={styles.createuserinput} type="text" name='name' onChange={handleChange} value={name}/>
      </div>
      <div className={styles.createuserlist}>
        <span>학번</span>
        <input className={styles.createuserinput} type="text" name='studentid' onChange={handleChange} value={studentid}/>
      </div>
      <div className={styles.createuserlist}>
        <span>학과</span>
        <input className={styles.createuserinput} type="text" name='department' onChange={handleChange} value={department}/>
      </div>
      <div className={styles.createuserlist}>
        <span>초기레이팅</span>
        <input className={styles.createuserinput} type="text" name='start_rating' onChange={handleChange} value={start_rating}/>
      </div>
      <div className={styles.createuserlist}>
        <span>상태</span>
        <select className={styles.createuserinput} type="select" name='status' onChange={handleChange} value={status}>
          <option>재학</option>
          <option>졸업</option>
          <option>휴학</option>
          <option>외부인</option>
        </select>
      </div>
      <button className={styles.submitbtn} onClick={userMakeSubmit}>전송</button>
    </div>
  );

  return (
    <div className={styles.ShortBox}>
      {userMaker}
    </div>
  );
};

export default CreateUser;
