import React, { useEffect, useState,useRef } from 'react';
import { dbService,authService,firebaseInstance,storageService } from '../../fbase'

const Post = ({userObj}) => {
  const [writeMode, setWriteMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [everyPost, setEveryPost] = useState([]);
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setEveryPost([])
    dbService.collection("post").orderBy("date","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const postObject = {
          content: doc.data().content,
          writer: doc.data().writer,
          writerprofile: doc.data().writerprofile,
          date: doc.data().date,
          recent_fix: doc.data().recent_fix,
          imagelist: doc.data().imageurl,
        }
        setEveryPost(everyPost => [...everyPost, postObject]);
      })
    })
  }, [refresh])

  const onSocialClick = async(event) => {
    const {target:{name},
    } = event;
    let provider;
    if(name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  const submitReview = async(e) =>{
    e.preventDefault();
    if(content === ''){
      alert("내용을 입력하세요")
      return;
    }

    // 시간 관련 부분
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

    let attachmentUrl = [];

    async function sendData(){
      let i = 0;
      const promises = attachment.map(async(file) => {
        i = i+1;
        let attachmentRef = await storageService.ref().child('post/').child(time).child(String(i));
        let response = await attachmentRef.putString(file, "data_url");
        let url = await response.ref.getDownloadURL();
        return url
      })
      const results =  await Promise.all(promises)
      results.forEach(data => attachmentUrl.push(data) )
    }
    await sendData();
    
    const postObject = {
      date: time,
      recent_fix: time,
      content: content,
      writer: userObj.displayName,
      writerprofile: userObj.photoUrl,
      imageurl: attachmentUrl,
    }

    await dbService.collection("post").doc(time).set(postObject);
    setContent('')
    setWriteMode(!writeMode)
    setRefresh(!refresh)
    setAttachment([])
  };

  const writeModeBtn = () => {
    setWriteMode(!writeMode)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setContent(e.target.value)
  }

  const onFileChange = (event) => {
    const {target:{files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      setAttachment(attachment.concat(result))
    }
    reader.readAsDataURL(theFile);
  };

  const postImageOne = (post) => (
    post.map(url => ( 
      <img src={url} className="imageOne"/>
    ))
  )
  const postImageTwo = (post) => (
    post.map(url => ( 
      <img src={url} className="imageTwo"/>
    ))
  )
  const postImageThree = (post) => (
    <>
      <div><img src={post[0]} className="imageThreeBig"/></div>
      <div>
        <img src={post[1]} className="imageThreeSmall"/>
        <img src={post[2]} className="imageThreeSmall"/>
      </div>
    </>
  )
  const postImageFour = (post) => (
    post.map(url => ( 
      <img src={url} className="imageFour"/>
    ))
  )

  const imgClicked = (e) => {
    console.log(e.target.id)
    const ad = e.target.id;
    const modal = document.getElementById(ad.slice(3))
    console.log(modal)
    modal[0].style.display = "block";
  }

  const closeClick = (e) => {
    const modal = document.getElementById(e.currentTarget.id)
    modal[0].style.display = "none";
  }

  const postImages = (post) => (
    <div className="postImages">
      <div className="imageFour" onClick={imgClicked}><img id="img01" src={post[0]} className="fullimage"/></div>
      <div className="modal">
        <span className="close" onClick={closeClick}>&times;</span>
        <img className="modal-content" id="01" src={post[0]}/>
      </div>
      <div className="imageFour" id="img02" onClick={imgClicked}><img src={post[1]} className="fullimage"/></div>
      <div className="modal" id="02">
        <span className="close" onClick={closeClick}>&times;</span>
        <img className="modal-content" src={post[1]}/>
      </div>
      <div className="imageFour" id="img03" onClick={imgClicked}><img src={post[2]} className="fullimage"/></div>
      <div className="modal" id="03">
        <span className="close" onClick={closeClick}>&times;</span>
        <img className="modal-content" src={post[2]}/>
      </div>
      <div className="imageFour" id="img04" onClick={imgClicked}>
        <div className="moreimages"/>
        <div className="showmoreimages">더보기+</div>
        <img src={post[3]} className="fullimage"/>
      </div>
      <div className="modal" id="04">
        <span className="close" onClick={closeClick}>&times;</span>
        <img className="modal-content" src={post[3]}/>
      </div>
    </div>
  )

  const PostList = everyPost.map(post =>(
    <div className="post">
      <div className="postHeader">
        <div className="postHeaderLeft">
          <img className="userProfile" src={post.writerprofile}></img>
        </div>
        <div className="postHeaderRight">
          <div classNames="userName">{post.writer}</div>
          <div classNames="postDate">{post.date.slice(0,4)}년 {post.date.slice(4, 6)}월 {post.date.slice(6,8)}일</div>
        </div>
      </div>
      <div className="postContent">
        <div className="postText">{post.content}</div>
        <div className="postImages">
          {post.imagelist.length == 1 && postImageOne(post.imagelist)}
          {post.imagelist.length == 2 && postImageTwo(post.imagelist)}
          {post.imagelist.length == 3 && postImageThree(post.imagelist)}
          {post.imagelist.length == 4 && postImageFour(post.imagelist)}
          {post.imagelist.length >4 && postImages(post.imagelist)}
        </div>
      </div>
      <div className="postFooter">
        <div className="postLike">좋아요</div>
        <div className="postComment">댓글</div>
      </div>
    </div>
  ))

  const postMaker = (
      <div className={writeMode ? 'postMaker active' : 'postMaker'}>
        <div className="postMakeHeader"> 게시물 만들기 </div>
        <textarea className="makePost" onChange={handleChange} value={content} placeholder={`반갑습니다 ${userObj.displayName}님!`}></textarea>
        <div className="file">
          <div className="fileHeader">
            <input type="file" id="fileInput" className="fileInput" multiple={true} onChange={onFileChange}/>
            <label htmlFor="fileInput">
              <span>이미지 추가하기</span>
              <i class="fas fa-images fa-2x"></i>
            </label>
          </div>
          {attachment.length < 6 && (
            attachment.map(image => (
              <img className="images" src={image} alt="photo"/>
            ))
          )}
          {attachment.length >= 6 && (
            attachment.map(image => (
              <img className="images" src={image} alt="photo"/>
            ))
          )}
        </div>
        <div className="buttons">
          <button className="writeModeBtn" onClick={writeModeBtn}>
            취소
          </button>
          <button className="writeModeBtn" onClick={submitReview}>
            작성
          </button>
        </div>
      </div>
  )

  const postMakeBtn = (
    <div className="postMakeBtn">
      <div>{userObj.displayName} 님 안녕하세요!</div>
      <button className="writeModeBtn" onClick={writeModeBtn}>
        작성
      </button>
    </div>
  )

  const needLoginBtn = (
    <button onClick={onSocialClick} name="google" className="writeModeBtn">
      구글 로그인
    </button>
  )

  return (
    <>
      <div className="postMain">
        {postMaker}
        <div className={writeMode ? 'postList active' : 'postList'}>
          {userObj.displayName
            ? <>{postMakeBtn}</>
            : <>{needLoginBtn}</>
          }
          {PostList}
        </div>
      </div>
    </>
  )
};

export default Post;