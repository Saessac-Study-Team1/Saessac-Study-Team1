import React, { useState } from 'react';
import '../css/MyPage.css';

export default function MyPost ({ myPosts }){

const [isClicked, setIsClicked] = useState(false);

const clickHandler = () => {
  setIsClicked(!isClicked);
}
return(
  <div className="mypage-bottom__wrapper">
    <div className="mypage-bottomleft__title">
      <h3>내가 쓴 글보기</h3>
    </div>
    
    <div className="mypage-bottomright__content">
      <div className='mypage-bottomright__myPostsClickBtnContainer'>
        <button className='mypage-btnUnderline' onClick={clickHandler}>{isClicked ? null : `보기`}</button>
      </div>
    { isClicked ? (
      <div className='mypage-bottomright__myPostsContainer'>
      {myPosts.map(post => (
        <li className='mypage-bottomright__myPostsWrapper' key={post.tid}>
          <a className='mypage-bottomright__myPost' href={`/postdetail/${post.tid}`}>
            <span>▶︎ </span>
            <span className='mypage-bottomright__myPostTitle'>{post.topicTitle}</span>
          </a>
        </li>
      ))}
      <div className='mypage-bottomright__myPostsCloseBtnWrapper'>
        <button className='mypage-btnUnderline' onClick={clickHandler}>닫기</button>
      </div>
      </div>
    ) : null }
    </div>
  </div>  
);
}