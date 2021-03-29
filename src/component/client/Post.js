import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Post = () => {
  const [writeMode, setWriteMode] = useState(false);
  const [everyPost, setEveryPost] = useState([])
  const [post, setPost] = useState({
    title: '',
    content: ''
  })
  useEffect(() => {
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

  const submitReview = ()=>{
    console.log(post.title)
    console.log(post.content)
    console.log(writeMode)
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
      <div classNames="postDate">{post.date}</div>
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
          {writeMode
            ? <>{postMaker}</>
            : <><button className="writeModeBtn" onClick={writeModeBtn}>
                  작성
                </button>
              </>
          }
          {writeMode
            ? <></>
            : <div className="postList">
                {PostList}
              </div>
          }
          
        </div>
    )
};

export default Post;