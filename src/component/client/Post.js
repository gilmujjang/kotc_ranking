import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Post = ({userObj}) => {
  const [writeMode, setWriteMode] = useState(false);
  const [everyPost, setEveryPost] = useState([])
  const [post, setPost] = useState({
    title: '',
    content: ''
  })
  useEffect(() => {
    setEveryPost([])
    dbService.collection("post").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const postObject = {
          title: doc.data().title,
          content: doc.data().content,
          writter: doc.data().writter,
          date: doc.data().date,
          recent_fix: doc.data().recent_fix
        }
        setEveryPost(everyPost => [...everyPost, postObject]);
      })
    })
  }, [])

  const submitReview = async(e) =>{
    e.preventDefault();
    if(post.title === ''){
      alert("제목을 입력하세요")
      return;
    }
    if(post.content === ''){
      alert("내용을 입력하세요")
      return;
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

    const postObject = {
      date: time,
      title: post.title,
      content: post.content,
      writer: userObj.displayName,
    }
    await dbService.collection("post").doc(time).set(postObject);
    setPost({
      title: '',
      content:''
    })
    setWriteMode(!writeMode)
  };

  const getValue = e => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    })
  };

  const writeModeBtn = () => {
    setWriteMode(!writeMode)
  }

  const PostList = everyPost.map(post =>(
    <div className="post">
      <div classNames="postTitle">{post.title}</div>
      <div classNames="postDate">{post.date.slice(0,4)}년 {post.date.slice(4, 6)}월 {post.date.slice(6,8)}일</div>
    </div>
  ))
  const postMaker = (
      <div className='postMaker'>
        <input className="titleInput"
          type='text'
          placeholder='제목'
          onChange={getValue}
          name='title'
        />
        <CKEditor
          editor={ClassicEditor}
          data="내용을 입력하세용!"
          onChange={(event, editor) => {
            const data = editor.getData();
            setPost({
              ...post,
              content: data
            })
          }}
        />
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

    return (
        <div className="postMain">
          {userObj.displayName
            ? <>{writeMode
              ? <>{postMaker}</>
              : <><button className="writeModeBtn" onClick={writeModeBtn}>
                    작성
                  </button>
                </>
            }</>
            : <div>로그인을 하면 글을 작성할수 있습니다</div>
          }
          
          <div className="postList">
            {PostList}
          </div>
        </div>
    )
};

export default Post;