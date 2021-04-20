import React, { useEffect, useState,useRef } from 'react';
import { dbService,authService,firebaseInstance,storageService } from '../../fbase'
import firebase from 'firebase/app';

const Post = ({userObj}) => {
  const [writeMode, setWriteMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [everyPost, setEveryPost] = useState([]);
  const [contentmake, setContent] = useState('');
  const [commentmake, setComment] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [postimage, setPostImage] = useState([]);
  const [imageid, setImageId] = useState(0);
  const increment = firebase.firestore.FieldValue.increment(1);

  useEffect(() => {
    setEveryPost([])
    dbService.collection("post").orderBy("date","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(async(doc) => {
        let likelistname = [];
        let likelistuserid = [];
        let likenum = 0;
        let commentslists = [];
        await dbService.collection("post").doc(doc.data().date).collection("likes").get().then(likelist => {
          likelist.docs.map(like => {
            likenum += 1;
            likelistname.push(like.data().name);
            likelistuserid.push(like.data().userid);
          })
        })
        let commentsnum = 0;
        await dbService.collection("post").doc(doc.data().date).collection("comments").get().then(comment => {
          comment.docs.map(comment => {
            commentsnum += 1;
            const commentObject = {
              writerid: comment.data().writerid,
              writername: comment.data().writername,
              text: comment.data().text,
              writedate: comment.data().writedate,
              recentfix: comment.data().recentfix,
            }
            commentslists.unshift(commentObject);
          })
        })
        const postObject = {
          content: doc.data().content,
          writername: doc.data().writername,
          writerprofile: doc.data().writerprofile,
          date: doc.data().date,
          recent_fix: doc.data().recent_fix,
          imagelist: doc.data().imageurl,
          likenum: likenum,
          likelistname: likelistname,
          likelistuserid: likelistuserid,
          commentsnum: commentsnum,
          commentslist: commentslists,
          commentshow: false,
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

  function rightNow() {
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
    return time
  }

  const submitComment = async(e,post) =>{
    e.preventDefault();
    if(commentmake === ''){
      alert("내용을 입력하세요");
      return;
    }
    const time = rightNow();
    // async function sendData(){

    // }
    const commnetinfo = {
      text: commentmake,
      writedate: time,
      recentfix: time,
      writername: userObj.displayName,
      writerid: userObj.uid,
    }
    await dbService.collection("post").doc(post.post.date).collection("comments").doc(time).set(commnetinfo) //동시에 댓글을 달면 데이터가 겹쳐짐
    setComment('');
  };

  const unlikeClicked = async(e,post) => {
    e.preventDefault();
    await dbService.collection("post").doc(post.post.date).collection("likes").doc(userObj.uid).delete()

    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const likelistbyname = page.likelistname;
        const likelistbyuserid = page.likelistuserid;
        const namelist = likelistbyname.filter((name) => name !== userObj.displayName);
        const idlist = likelistbyuserid.filter((uid) => uid !== userObj.uid);

        const postObject = {
          content: page.content,
          writername: page.writername,
          writerprofile: page.writerprofile,
          date: page.date,
          recent_fix: page.recent_fix,
          imagelist: page.imagelist,
          likenum: page.likenum - 1,
          likelistname: namelist,
          likelistuserid: idlist,
          commentsnum: page.commentsnum,
          commentslist: page.commentslists,
          commentshow: page.commentshow,
        }
        page = postObject;
      }
      return page
    })
     setEveryPost(neweverypost);  
    }

  const likeClicked = async(e,post) => {
    e.preventDefault();
    const likeinfo = {
      name: userObj.displayName,
      userid: userObj.uid,
      time: rightNow(),
    }
    await dbService.collection("post").doc(post.post.date).collection("likes").doc(userObj.uid).set(likeinfo)

    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const likelistbyname = page.likelistname;
        const likelistbyuserid = page.likelistuserid;
        likelistbyname.push(userObj.displayName);
        likelistbyuserid.push(userObj.uid);

        const postObject = {
          content: page.content,
          writername: page.writername,
          writerprofile: page.writerprofile,
          date: page.date,
          recent_fix: page.recent_fix,
          imagelist: page.imagelist,
          likenum: page.likenum + 1,
          likelistname: likelistbyname,
          likelistuserid: likelistbyuserid,
          commentsnum: page.commentsnum,
          commentslist: page.commentslists,
          commentshow: page.commentshow,
        }
        page = postObject;
      }
      return page
    })
    setEveryPost(neweverypost);    
  }

  const submitReview = async(e) =>{
    e.preventDefault();
    if(contentmake === ''){
      alert("내용을 입력하세요")
      return;
    }
    const time = rightNow();
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
      content: contentmake,
      writername: userObj.displayName,
      writerid: userObj.uid,
      writerprofile: userObj.photoUrl,
      imageurl: attachmentUrl,
      like: 0,
      comment: 0,
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

  const commentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value)
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

  const moveleft = () => {
    setImageId(imageid-1)
  }

  const moveright = () => {
    setImageId(imageid+1)
  }

  const imgClicked = (e,post) => {
    setPostImage(post.post)
    setImageId(parseInt(e.target.id))
    setShowImage(true);
  }

  const closeClick = () => {
    setPostImage([])
    setImageId('')
    setShowImage(false);
  }

  const showcomment = (e,post) => {
    e.preventDefault();
    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const postObject = {
          content: page.content,
          writername: page.writername,
          writerprofile: page.writerprofile,
          date: page.date,
          recent_fix: page.recent_fix,
          imagelist: page.imagelist,
          likenum: page.likenum,
          likelistname: page.likelistname,
          likelistuserid: page.likelistuserid,
          commentsnum: page.commentsnum,
          commentslist: page.commentslist,
          commentshow: !page.commentshow,
        }
        page = postObject;
      }
      return page
    })
    setEveryPost(neweverypost);   
  }

  const postImageOne = (post) => (
      <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className="imageOne"/>
  )

  const postImageTwo = (post) => (
    <div className="postImages">
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className="imageTwo"/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="1" onClick={(e) => {imgClicked(e,{post})}} src={post[1]} className="imageTwo"/>
      </div>
    </div>
  )

  const postImageThree = (post) => (
    <>
      <div onClick={(e) => {imgClicked(e,{post})}}><img id="0" src={post[0]} className="imageThreeBig"/></div>
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="1" src={post[1]} className="imageThreeSmall"/>
        <img id="2" src={post[2]} className="imageThreeSmall"/>
      </div>
    </>
  )

  const postImageFour = (post) => (
    <div className="postImages">
      <div onClick={(e) => {imgClicked(e,{post})}} className="imageFour">
        <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className="fullimage"/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className="imageFour">
        <img id="1" onClick={(e) => {imgClicked(e,{post})}} src={post[1]} className="fullimage"/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className="imageFour">
        <img id="2" onClick={(e) => {imgClicked(e,{post})}} src={post[2]} className="fullimage"/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className="imageFour">
        <img id="3" onClick={(e) => {imgClicked(e,{post})}} src={post[3]} className="fullimage"/>
      </div>
    </div>
  )

  const postImages = (post) => (
    <div className="postImages">
      <div className="imageFour" post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="0" src={post[0]} className="fullimage"/></div>
      <div className="imageFour" post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="1" src={post[1]} className="fullimage"/></div>
      <div className="imageFour" post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="2" src={post[2]} className="fullimage"/></div>
      <div className="imageFour" post={post} onClick={(e) => {imgClicked(e,{post})}}>
        <div className="moreimages" id="3"/>
        <div className="showmoreimages" id="3">더보기+</div>
        <img id="3" src={post[3]} className="fullimage"/>
      </div>
    </div>
  )

  const modal = (
    <div className='modal'>
      <span className="close" onClick={closeClick}>&times;</span>
      {imageid != 0 && <span className="left" onClick={moveleft}>&lt;</span>}
      {postimage.length-1 !== imageid && <span className="right" onClick={moveright}>&gt;</span>}
      <img className="modal-content" src={postimage[imageid]}/>
    </div>
  )

  const PostList = everyPost.map(post =>(
    <div className="post">
      <div className="postHeader">
        <div className="postHeaderLeft">
          <img className="userProfile" src={post.writerprofile}></img>
        </div>
        <div className="postHeaderRight">
          <div classNames="userName">{post.writername}</div>
          <div classNames="postDate">{post.date.slice(0,4)}년 {post.date.slice(4, 6)}월 {post.date.slice(6,8)}일</div>
        </div>
      </div>
      <div className="postContent">
        <div className="postText">{post.content}</div>
        <div className="postImage">
          {post.imagelist.length == 1 && postImageOne(post.imagelist)}
          {post.imagelist.length == 2 && postImageTwo(post.imagelist)}
          {post.imagelist.length == 3 && postImageThree(post.imagelist)}
          {post.imagelist.length == 4 && postImageFour(post.imagelist)}
          {post.imagelist.length > 4 && postImages(post.imagelist)}
        </div>
      </div>
      <div className="heartandcomment">
        <div className="getheart">
          <i className="hearticon fas fa-heart"></i>
          {post.likenum}
        </div>
        <div className="getcomment">
          <i class="commenticon fas fa-comment"></i>
          {post.commentsnum}
        </div>
      </div>
      
      <div className="postFooter">
        {post.likelistuserid.includes(userObj.uid)
          ? <div className="postLike"><i className="heart fas fa-heart" onClick={(e) => {unlikeClicked(e,{post})}}></i></div>
          : <div className="postLike"><i className="heart far fa-heart" onClick={(e) => {likeClicked(e,{post})}}></i></div>
        }
        <div onClick={(e) => {showcomment(e,{post})}} className="postComment">댓글 쓰기</div>
      </div>
      {post.commentshow && (  //댓글작성, 보기
        <div className="commentsBox">
          <div className="commentmaker">
            <img class="commentUserProfile" src={userObj.photoUrl}></img>
            <input className="commentwrite" onChange={commentChange} value={commentmake} placeholder="댓글을 입력해보세용"></input>
            {commentmake ? <button className="commentsubmitbtn" onClick={(e) => {submitComment(e,{post})}}><p>보내기</p></button> : <div className="btnunactive"><p>보내기</p></div>}
          </div>
          {post.commentslist.map(comment => (
              <div className="comments">
                <div>{comment.writername}</div>
                <div>{comment.text}</div>
                <div>{comment.writedate}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  ))

  const postMaker = (
      <div className={writeMode ? 'postMaker active' : 'postMaker'}>
        <div className="postMakeHeader"> 게시물 만들기 </div>
        <textarea className="makePost" onChange={handleChange} value={contentmake} placeholder={`반갑습니다 ${userObj.displayName}님!`}></textarea>
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
        {showImage && modal}
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