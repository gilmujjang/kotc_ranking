import React, { useEffect, useRef, useState } from 'react';
import { dbService } from '../../fbase'

const Post = () => {
  const [everyPost, setEveryPost] = useState([])
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

  const PostList = everyPost.map(post =>(
    <div className="post">
      <div classNames="postTitle">{post.title}</div>
      <div classNames="postDate">{post.date}</div>
      <div classNames="postContent">{post.content}</div>
    </div>
  ))

    return (
        <div className="postMain">
          <div className="postHeader">
            <div>작성</div>
            <div>수정</div>
            <div>읽기</div>
            <div>뭐라도하겠지</div>
          </div>
          <div className="postList">
            {PostList}
          </div>
        </div>
    )
};

export default Post;