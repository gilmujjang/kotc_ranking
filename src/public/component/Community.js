import React, { useEffect, useState,useRef, useContext } from 'react';
import { dbService,authService,firebaseInstance,storageService } from '../../fbase'
import firebase from 'firebase/app';
import styles from '../css/Community.module.css'
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react'
import UserObjContext from '../../contextAPI/UserObjContext';

const Community = ({groupName}) => {
  // 요렇게 불러오면 됩니다.
  const [userObj, setUserObj] = useContext(UserObjContext)

  const [writeMode, setWriteMode] = useState(false);
  const [postFixmode, setPostFixMode] =useState(false);
  const [refresh, setRefresh] = useState(false);
  const [everyPost, setEveryPost] = useState([]);
  const [contentmake, setContent] = useState('');
  const [commentmake, setComment] = useState('');
  const [commentfix, setCommentFix] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [postimage, setPostImage] = useState([]);
  const [imageid, setImageId] = useState(0);
  const increment = firebase.firestore.FieldValue.increment(1);

  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
        });
      } else {
        authService.signInAnonymously()
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
      }
    });
  }, [])
  useEffect(() => {
    setEveryPost([])
    dbService.collection(groupName).doc("group_data").collection("post").orderBy("date","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(async(doc) => {
        let likelistname = [];
        let likelistuserid = [];
        let likenum = 0;
        let commentslists = [];
         dbService.collection(groupName).doc("group_data").collection("post").doc(doc.data().date).collection("likes").get().then(likelist => {
          likelist.docs.map(like => {
            likenum += 1;
            likelistname.push(like.data().name);
            likelistuserid.push(like.data().userid);
          })
        })
        let commentsnum = 0;
         dbService.collection(groupName).doc("group_data").collection("post").doc(doc.data().date).collection("comments").get().then(comment => {
          comment.docs.map(comment => {
            commentsnum += 1;
            const commentObject = {
              writerid: comment.data().writerid,
              writername: comment.data().writername,
              text: comment.data().text,
              writedate: comment.data().writedate,
              recentfix: comment.data().recentfix,
              writerphoto: comment.data().writerphoto,
              commentfixmode: false,
            }
            commentslists.unshift(commentObject);
          })
        })
        const postObject = {
          content: doc.data().content,
          writername: doc.data().writername,
          writerid: doc.data().writerid,
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
          moremenushow: false,
          postfixmode: false,
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
     authService.signInWithPopup(provider);
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

  const commentfixSubmit = async(e,object) => {
    e.preventDefault();
    if(commentfix === ''){
      alert("내용을 입력하세요");
      return;
    }
    if(commentfix === object.comment.text){
      return;
    }
    const time = rightNow();
     dbService.collection(groupName).doc("group_data").collection("post").doc(object.post.date).collection("comments").doc(object.comment.writedate).update({text: commentfix, recentfix: time})
    const neweverypost = everyPost.map(page => {
      if(page.date == object.post.date){
        page.commentslist.map(comment => {
          if(comment.writedate == object.comment.writedate){
            comment.commentfixmode = !comment.commentfixmode
            comment.text = commentfix
          }
          return comment
        })
      }
      return page
    })
    setEveryPost(neweverypost);
    setCommentFix('');
  }

  const submitComment = async(e,post) => {
    e.preventDefault();
    if(commentmake === ''){
      alert("내용을 입력하세요");
      return;
    }
    const time = rightNow();
    const commentinfo = {
      text: commentmake,
      writedate: time,
      recentfix: time,
      writername: userObj.displayName,
      writerid: userObj.uid,
      writerphoto: userObj.photoUrl,
    }
     dbService.collection(groupName).doc("group_data").collection("post").doc(post.post.date).collection("comments").doc(time).set(commentinfo) //동시에 댓글을 달면 데이터가 겹쳐짐
    setComment('');

    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const commentslists = page.commentslist;
        commentslists.unshift(commentinfo);
        page.commentslist = commentslists;
      }
      return page
    })
    setEveryPost(neweverypost); 
  };

  const unlikeClicked = async(e,post) => {
    e.preventDefault();
     dbService.collection(groupName).doc("group_data").collection("post").doc(post.post.date).collection("likes").doc(userObj.uid).delete()

    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const likelistbyname = page.likelistname;
        const likelistbyuserid = page.likelistuserid;
        const namelist = likelistbyname.filter((name) => name !== userObj.displayName);
        const idlist = likelistbyuserid.filter((uid) => uid !== userObj.uid);
        page.likenum = page.likenum -1;
        page.likelistname = namelist;
        page.likelistuserid = idlist;
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
     dbService.collection(groupName).doc("group_data").collection("post").doc(post.post.date).collection("likes").doc(userObj.uid).set(likeinfo)

    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        const likelistbyname = page.likelistname;
        const likelistbyuserid = page.likelistuserid;
        likelistbyname.push(userObj.displayName);
        likelistbyuserid.push(userObj.uid);
        page.likenum = page.likenum + 1;
        page.likelistname = likelistbyname;
        page.likelistuserid = likelistbyuserid;
      }
      return page
    })
    setEveryPost(neweverypost);    
  }

  const submitPost = async(e) =>{
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
        console.log(file.slice(0,4))
        if(file.slice(0,4)=="http"){
          return file
        } else {
          let attachmentRef =  storageService.ref().child('post/').child(time).child(String(i));
          let response =  attachmentRef.putString(file, "data_url");
          let url =  response.ref.getDownloadURL();
          return url
        }
      })
      const results =   Promise.all(promises)
      results.forEach(data => attachmentUrl.push(data) )
    }
     sendData();

    if(postFixmode){
      console.log("postfixmode")
       dbService.collection(groupName).doc("group_data").collection("post").doc(postFixmode).update({recent_fix: time,content: contentmake,imageurl: attachmentUrl,})
    } else {
      const postObject = {
        date: time,
        recent_fix: time,
        content: contentmake,
        writername: userObj.displayName,
        writerid: userObj.uid,
        writerprofile: userObj.photoUrl,
        imageurl: attachmentUrl,
      }
       dbService.collection(groupName).doc("group_data").collection("post").doc(time).set(postObject);
    }
    setContent('')
    setWriteMode(!writeMode)
    setRefresh(!refresh)
    setAttachment([])
    setPostFixMode(false)
  };

  const writeModeBtn = () => {
    setContent('')
    setAttachment([])
    setPostFixMode(false)
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

  const commentfixChange = (e) => {
    e.preventDefault();
    setCommentFix(e.target.value)
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
        page.commentshow = !page.commentshow;
      }
      return page
    })
    setEveryPost(neweverypost);   
  }

  const postImageOne = (post) => (
      <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className={styles.imageOne}/>
  )

  const postImageTwo = (post) => (
    <div className="postImages">
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className={styles.imageTwo}/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="1" onClick={(e) => {imgClicked(e,{post})}} src={post[1]} className={styles.imageTwo}/>
      </div>
    </div>
  )

  const postImageThree = (post) => (
    <>
      <div onClick={(e) => {imgClicked(e,{post})}}><img id="0" src={post[0]} className={styles.imageThreeBig}/></div>
      <div onClick={(e) => {imgClicked(e,{post})}}>
        <img id="1" src={post[1]} className={styles.imageThreeSmall}/>
        <img id="2" src={post[2]} className={styles.imageThreeSmall}/>
      </div>
    </>
  )

  const postImageFour = (post) => (
    <div className={styles.postImages}>
      <div onClick={(e) => {imgClicked(e,{post})}} className={styles.imageFour}>
        <img id="0" onClick={(e) => {imgClicked(e,{post})}} src={post[0]} className={styles.fullimage}/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className={styles.imageFour}>
        <img id="1" onClick={(e) => {imgClicked(e,{post})}} src={post[1]} className={styles.fullimage}/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className={styles.imageFour}>
        <img id="2" onClick={(e) => {imgClicked(e,{post})}} src={post[2]} className={styles.fullimage}/>
      </div>
      <div onClick={(e) => {imgClicked(e,{post})}} className={styles.imageFour}>
        <img id="3" onClick={(e) => {imgClicked(e,{post})}} src={post[3]} className={styles.fullimage}/>
      </div>
    </div>
  )

  const postImages = (post) => (
    <div className={styles.postImages}>
      <div className={styles.imageFour} post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="0" src={post[0]} className={styles.fullimage}/></div>
      <div className={styles.imageFour} post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="1" src={post[1]} className={styles.fullimage}/></div>
      <div className={styles.imageFour} post={post} onClick={(e) => {imgClicked(e,{post})}}><img id="2" src={post[2]} className={styles.fullimage}/></div>
      <div className={styles.imageFour} post={post} onClick={(e) => {imgClicked(e,{post})}}>
        <div className={styles.moreimages} id="3"/>
        <div className={styles.showmoreimages} id="3">더보기+</div>
        <img id="3" src={post[3]} className={styles.fullimage}/>
      </div>
    </div>
  )

  const modal = (
    <div className={styles.modal}>
      <span className={styles.close} onClick={closeClick}>&times;</span>
      {imageid != 0 && <span className={styles.left} onClick={moveleft}>&lt;</span>}
      {postimage.length-1 !== imageid && <span className={styles.right} onClick={moveright}>&gt;</span>}
      <img className={styles.modal_content} src={postimage[imageid]}/>
    </div>
  )

  const Postfix = async(e, post) => {
    setPostFixMode(post.post.date)
    setWriteMode(!writeMode)
    setContent(post.post.content)
    setAttachment(post.post.imagelist)

  }

  const Postdelete = async(e,post) => {
    if(window.confirm("ㄹㅇ 지움?")) {
       dbService.collection(groupName).doc("group_data").collection("post").doc(post.post.date).delete()
      setRefresh(!refresh)
    }
  }

  const Postmenushow = (e, post) => {
    const neweverypost = everyPost.map(page => {
      if(page.date == post.post.date){
        page.moremenushow = !page.moremenushow
      }
      return page
    })
    setEveryPost(neweverypost);   
  }

  const Commentdelete = async(e,object) => {
    if(window.confirm("ㄹㅇ 지움?")) {
       dbService.collection(groupName).doc("group_data").collection("post").doc(object.post.date).collection("comments").doc(object.comment.writedate).delete()
      setRefresh(!refresh)
    }
  }

  const Commentfix = async(e,object) => {
    const neweverypost = everyPost.map(page => {
      if(page.date == object.post.date){
        page.commentslist.map(comment => {
          if(comment.writedate == object.comment.writedate){
            comment.commentfixmode = !comment.commentfixmode
          }
          return comment
        })
      }
      return page
    })
    setEveryPost(neweverypost);
    setCommentFix(object.comment.text)
  }

  const PostList = everyPost.map(post =>(
    <div className={styles.post}>
      {post.writerid == userObj.uid && (
        <div className={styles.moremenu} onClick={(e) => {Postmenushow(e,{post})}}>
          <Icon name="cog icon" className={styles.moremenuicon}></Icon>
          <div className={post.moremenushow ? styles.moremenuactive : styles.moremenuicons}>
            <div className={styles.postfix} onClick={(e) => {Postfix(e,{post})}}>수정</div>
            <div className={styles.postdelete} onClick={(e) => {Postdelete(e,{post})}}>삭제</div>
          </div>
        </div>
      )}
      <div className={styles.postHeader}>
        <div className={styles.postHeaderLeft}>
          <img className={styles.userProfile} src={post.writerprofile}></img>
        </div>
        <div className={styles.postHeaderRight}>
          <div classNames={styles.userName}>{post.writername}</div>
          <div classNames={styles.postDate}>{post.date.slice(0,4)}년 {post.date.slice(4, 6)}월 {post.date.slice(6,8)}일</div>
        </div>
      </div>
      <div className={styles.postContent}>
        <div className={styles.postText}>{post.content}</div>
        <div className={styles.postImage}>
          {post.imagelist.length == 1 && postImageOne(post.imagelist)}
          {post.imagelist.length == 2 && postImageTwo(post.imagelist)}
          {post.imagelist.length == 3 && postImageThree(post.imagelist)}
          {post.imagelist.length == 4 && postImageFour(post.imagelist)}
          {post.imagelist.length > 4 && postImages(post.imagelist)}
        </div>
      </div>
      <div className={styles.heartandcomment}>
        <div className={styles.getheart}>
          <Icon name="heart icon" className={styles.hearticon}></Icon>
          {post.likenum}
          <div className={styles.likelistshow}>{post.likelistname.map(username => <div classNames={styles.likeuser}>{username}</div>)}</div>
        </div>
        <div onClick={(e) => {showcomment(e,{post})}} className={styles.getcomment}>
          <Icon name="comment icon" className={styles.commenticon}></Icon>
          {post.commentsnum}
        </div>
      </div>     
      <div className={styles.postFooter}>
        {post.likelistuserid.includes(userObj.uid)
          ? <div className={styles.postLike}><Icon name="heart icon" className={styles.hearticon} onClick={(e) => {unlikeClicked(e,{post})}}></Icon>좋아요</div>
          : <div className={styles.postLike}><Icon name="heart outline icon" className={styles.hearticon} onClick={(e) => {likeClicked(e,{post})}}></Icon>좋아요</div>
        }
        <div onClick={(e) => {showcomment(e,{post})}} className={styles.postComment}><Icon name="comment icon" className={styles.commenticon}></Icon>댓글 쓰기</div>
      </div>
      {post.commentshow && (  //댓글작성, 보기
        <div className={styles.commentsBox}>
          <div className={styles.commentmaker}>
            <img class={styles.commentUserProfile} src={userObj.photoUrl}></img>
            <input className={styles.commentwrite} onChange={commentChange} value={commentmake} placeholder="댓글을 입력해보세용"></input>
            {commentmake ? <button className={styles.commentsubmitbtn} onClick={(e) => {submitComment(e,{post})}}><p>보내기</p></button> : <div className={styles.btnunactive}><p>보내기</p></div>}
          </div>
          {post.commentslist.map(comment => (
              <div className={styles.comments}>
                <div className={styles.commentuserprofile}><img className={styles.commentUserProfile} src={comment.writerphoto} alt="프사"></img></div>
                <div className={styles.commentmain}>
                  <div className={styles.commentwriter}>{comment.writername}</div>
                  {comment.commentfixmode
                    ? <div className={styles.commentfixmain}>
                        <input className={styles.commentwrite} onChange={commentfixChange} value={commentfix}></input>
                        <button className={styles.commentsubmitbtn} onClick={(e) => {commentfixSubmit(e,{post,comment})}}><p>수정</p></button>
                      </div>
                    : <div>{comment.text}</div>
                  }
                  <div className={styles.commentwritedate}>{comment.writedate.slice(0, 4)}년 {comment.writedate.slice(4, 6)}월 {comment.writedate.slice(6,8)}일</div>
                </div>
                {comment.writerid == userObj.uid && (
                  <div className={styles.commentmoremenu}>
                    <Icon name="cog icon" className={styles.moremenuicon}></Icon>
                    <div className={styles.commentmoremenuactive}>
                      <div className={styles.commentfix} onClick={(e) => {Commentfix(e,{post,comment})}}>수정</div>
                      <div className={styles.commentdelete} onClick={(e) => {Commentdelete(e,{post,comment})}}>삭제</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  ))

  const postMaker = (
      <div className={styles.postMaker}>
        <div className={styles.postMakeHeader}> 게시물 만들기 </div>
        <textarea className={styles.makePost} onChange={handleChange} value={contentmake} placeholder={`반갑습니다 ${userObj.displayName}님!`}></textarea>
        <div className={styles.file}>
          <div className={styles.fileHeader}>
            <input type="file" id="fileInput" className={styles.fileInput} multiple={true} onChange={onFileChange}/>
            <label htmlFor="fileInput">
              <span>이미지 추가하기</span>
              <Icon name="file image outline icon"></Icon>
            </label>
          </div>
          {attachment.length < 6 && (
            attachment.map(image => (
              <img className={styles.images} src={image} alt="photo"/>
            ))
          )}
          {attachment.length >= 6 && (
            attachment.map(image => (
              <img className="images" src={image} alt="photo"/>
            ))
          )}
        </div>
        <div className={styles.buttons}>
          <button className={styles.writeModeBtn} onClick={writeModeBtn}>
            취소
          </button>
          <button className={styles.writeModeBtn} onClick={submitPost}>
            작성
          </button>
        </div>
      </div>
  )

  const postMakeBtn = (
    <div className={styles.postMakeBtn}>
      <div>{userObj.displayName} 님 안녕하세요!</div>
      <button className={styles.writeModeBtn} onClick={writeModeBtn}>
        작성
      </button>
    </div>
  )

  const needLoginBtn = (
    <button onClick={onSocialClick} name="google" className={styles.writeModeBtn}>
      구글 로그인
    </button>
  )


  // const reset = () => {
  //   dbService.collection("KOTC").doc("group_data").collection("players").get().then(snapshot => {
  //     snapshot.docs.map(async (player) => {
  //       console.log(player.data())
  //        dbService.collection("KOTC").doc("group_data").collection("players").doc(player.data().name).update({
  //         game_all: 0,
  //         game_win: 0,
  //         game_lose: 0,
  //         rating: player.data().start_rating
  //       })
  //     })
  //   })
  // }

  // const test = async() => {
  //   let count = 1
  //   let playerlist = {
  //     '정해광': {'total_data': [1900, 0, 0, 0]},
  //     '조성빈': {'total_data': [1500, 0, 0, 0]},
  //     '유연호': {'total_data': [1500, 0, 0, 0]},
  //     '백민재': {'total_data': [1500, 0, 0, 0]},
  //     '원지섭': {'total_data': [1500, 0, 0, 0]},
  //     '유현승': {'total_data': [1500, 0, 0, 0]},
  //     '민무길': {'total_data': [1500, 0, 0, 0]},
  //     '최준혁': {'total_data': [1300, 0, 0, 0]},
  //     '오예원': {'total_data': [1300, 0, 0, 0]},
  //     '장현광': {'total_data': [1300, 0, 0, 0]},
  //     '정혜성': {'total_data': [1300, 0, 0, 0]},
  //     '김한승': {'total_data': [1500, 0, 0, 0]},
  //     '김현식': {'total_data': [2100, 0, 0, 0]},
  //     '김태호': {'total_data': [1300, 0, 0, 0]},
  //     '강성광': {'total_data': [1500, 0, 0, 0]},
  //     '박재현': {'total_data': [2100, 0, 0, 0]},
  //     '정화': {'total_data': [1500, 0, 0, 0]},
  //     '이학봉': {'total_data': [1100, 0, 0, 0]},
  //     '전경민': {'total_data': [900, 0, 0, 0]},
  //     '신도엽': {'total_data': [900, 0, 0, 0]},
  //     '이경훈': {'total_data': [1100, 0, 0, 0]},
  //     '허민영': {'total_data': [900, 0, 0, 0]},
  //     '이창민': {'total_data': [1300, 0, 0, 0]},
  //     '김종호': {'total_data': [1300, 0, 0, 0]},
  //     '미영': {'total_data': [1300, 0, 0, 0]},
  //     '강지훈': {'total_data': [1500, 0, 0, 0]},
  //     '김성동': {'total_data': [1500, 0, 0, 0]},
  //     '조경수': {'total_data': [1100, 0, 0, 0]},
  //     '장태희': {'total_data': [900, 0, 0, 0]},
  //     '양승현': {'total_data': [900, 0, 0, 0]},
  //     '김현아': {'total_data': [900, 0, 0, 0]},
  //     '박태용': {'total_data': [900, 0, 0, 0]},
  //     '정의영': {'total_data': [900, 0, 0, 0]},
  //     '박재홍': {'total_data': [900, 0, 0, 0]},
  //     '종호': {'total_data': [1300, 0, 0, 0]}
  //   }

  //   await dbService.collection("game").orderBy("write_time","asc").get().then(snapshot => {
  //     snapshot.docs.map(doc => {
  //       const winners = doc.data().winners
  //       const losers = doc.data().losers
  //       let winnerAverageRating = 0;
  //       let loserAverageRating = 0;
  //       let reverse_percentage = 0;
  //       let percentage = 0;
  //       let RatingChange = 0;
  //       let average_rating = 0;
  //       let rating_gap = 0;
  //       let standard_deviation = 0;
  //       let deviation_number = 0;
  //       let winner1 = 0;
  //       let winner2 = 0;
  //       let loser1 = 0;
  //       let loser2 = 0;
  //       let winnerRatingBefore = []
  //       let winnerRatingAfter = []
  //       let loserRatingBefore = []
  //       let loserRatingAfter = []

  //       if(winners.length == 1){
  //         const winnername = winners[0]
  //         const losername = losers[0]
  //         winnerAverageRating = playerlist[winnername]["total_data"][0]
  //         winnerRatingBefore.push(winnerAverageRating)
  //         loserAverageRating = playerlist[losername]["total_data"][0]
  //         loserRatingBefore.push(loserAverageRating)
  
  //         reverse_percentage = (1/(1+(Math.pow(10,(winnerAverageRating-loserAverageRating)/400)))).toFixed(2)
  //         percentage = (1-reverse_percentage)*100
  //         RatingChange = Math.round(reverse_percentage*48)
  //         winnerRatingAfter.push(winnerRatingBefore[0]+RatingChange)
  //         loserRatingAfter.push(loserRatingBefore[0]-RatingChange)
  //       }
  
  //       if(winners.length == 2){
  //         const winner1name = winners[0]
  //         const winner2name = winners[1]
  //         const loser1name = losers[0]
  //         const loser2name = losers[1]

  //         winner1 = playerlist[winner1name]["total_data"]
  //         winnerRatingBefore.push(winner1[0])
  //         winner2 = playerlist[winner2name]["total_data"]
  //         winnerRatingBefore.push(winner2[0])
  //         loser1 = playerlist[loser1name]["total_data"]
  //         loserRatingBefore.push(loser1[0])
  //         loser2 = playerlist[loser2name]["total_data"]
  //         loserRatingBefore.push(loser2[0])
         
  //         if(winner1[0] > winner2[0]){
  //           winnerAverageRating = (winner1[0] + 2*winner2[0])/3
  //         } else {
  //           winnerAverageRating = (2*winner1[0] + winner2[0])/3
  //         }
  //         if(loser1[0] > loser2[0]){
  //           loserAverageRating = (loser1[0] + 2*loser2[0])/3
  //         } else {
  //           loserAverageRating = (2*loser1[0] + loser2[0])/3
  //         }
          
  //         rating_gap = winnerAverageRating-loserAverageRating
  //         reverse_percentage = (1/(1+(Math.pow(10,rating_gap/400)))).toFixed(2)
  //         percentage = Math.round((1-reverse_percentage)*100)
  //         RatingChange = Math.round(reverse_percentage*36)
    
  //         average_rating = Math.round((winner1[0]+winner2[0]+loser1[0]+loser2[0])/4)
  //         standard_deviation = Math.sqrt((winner1[0]-average_rating)**2 + (winner2[0]-average_rating)**2 +(loser1[0]-average_rating)**2 +(loser2[0]-average_rating)**2)
  //         if (standard_deviation < 800){
  //           deviation_number = Math.sqrt((800-standard_deviation)/800)
  //         }

  //         RatingChange = Math.round(deviation_number*RatingChange)
  //         if(RatingChange == 0){
  //           RatingChange = 1
  //         }
  //         winnerRatingAfter.push(winnerRatingBefore[0]+RatingChange)
  //         winnerRatingAfter.push(winnerRatingBefore[1]+RatingChange)
  //         loserRatingAfter.push(loserRatingBefore[0]-RatingChange)
  //         loserRatingAfter.push(loserRatingBefore[1]-RatingChange)
  //       }

  //       const game_object = {
  //         date : doc.data().date,
  //         percentage: Math.round(percentage),
  //         ratingChange : RatingChange,
  //         winners : winners,
  //         winnerRatingBefore : winnerRatingBefore,
  //         winnerRatingAfter: winnerRatingAfter,
  //         losers : losers,
  //         loserRatingBefore: loserRatingBefore,
  //         loserRatingAfter: loserRatingAfter,
  //         write_time: doc.data().write_time
  //       }
  //       console.log(game_object)
  //       dbService.collection("KOTC").doc("group_data").collection("games").doc(doc.data().date +"-"+ doc.data().write_time).set(game_object)
  //       winners.map(winner => {
  //         playerlist[winner]["total_data"][0] = playerlist[winner]["total_data"][0]+RatingChange
  //         playerlist[winner]["total_data"][1] = playerlist[winner]["total_data"][1]+1
  //         playerlist[winner]["total_data"][2] = playerlist[winner]["total_data"][2]+1
  //         dbService.collection("KOTC").doc("group_data").collection("players").doc(winner).collection("game_record").doc(doc.data().date +"-"+ doc.data().write_time).set(game_object)
  //       })
  //        losers.map(loser => {
  //         playerlist[loser]["total_data"][0] = playerlist[loser]["total_data"][0]-RatingChange
  //         playerlist[loser]["total_data"][1] = playerlist[loser]["total_data"][1]+1
  //         playerlist[loser]["total_data"][3] = playerlist[loser]["total_data"][3]+1
  //         dbService.collection("KOTC").doc("group_data").collection("players").doc(loser).collection("game_record").doc(doc.data().date +"-"+ doc.data().write_time).set(game_object)
  //       })
  //     })
  //   })

  //   dbService.collection("KOTC").doc("group_data").collection("players").get().then(snapshot => {
  //     snapshot.docs.map(player => {
  //       const name = player.data().name
  //       dbService.collection("KOTC").doc("group_data").collection("players").doc(name).update({
  //         rating: playerlist[name]["total_data"][0],
  //         game_all: playerlist[name]["total_data"][1],
  //         game_win: playerlist[name]["total_data"][2],
  //         game_lose: playerlist[name]["total_data"][3]
  //       })
  //     })
  //   })
  // }

  return (
    <>
      <div className={styles.postMain}>
        {showImage && modal}
        {writeMode && postMaker}
        {/* <button onClick={test}>데이터처리</button>
        <button onClick={reset}>초기화</button> */}
        <div className={writeMode ? styles.postListactive : styles.postList}>
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

export default Community;
