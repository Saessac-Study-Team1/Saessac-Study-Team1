import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function DeleteAccount(){
  const [modal, setModal] = useState(false);
  
  // 회원 탈퇴
  const modalHandler = () => {
    setModal(!modal);
  }
  const deleteAccountHandler = () => {
    axios.delete((`http://34.168.215.145/user/`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      console.log('계정삭제완료'); 
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="mypage-bottom__wrapper">
      <div className="mypage-bottomleft__title">
        <h3>회원정보 삭제</h3>
      </div>
      <div className="mypage-bottomright__content">
      <div className="mypage-bottomright__deleteAccountContainer">
        <div className="mypage-bottomright__deleteAccountWrapper">
          <button className="mypage-btn redbtn" onClick={modalHandler}>회원정보 삭제</button>
          <div className="mypage-bottomright__deleteAccountDescription">
            <div>회원정보 삭제시 작성하신 글과 댓글이 모두 삭제되며 복구되지 않습니다.</div>    
          </div>
        </div>
        { modal ? (
            <div className="mypage-bottomright__ModalBackground" onClick={modalHandler}>
              <div className="mypage-bottomright__ModalView">
                  <h3>회원정보 삭제</h3>
                  <div className="mypage-bottomright__ModalMsg">정말로 회원정보를 삭제하시겠습니까?</div>
                  <div className="mypage-bottomright__ModalButtonArea">
                    <button className="mypage-btn" onClick={modalHandler}>취소</button>
                    <button className="mypage-btn blackbtn" onClick={deleteAccountHandler}>확인</button>
                  </div>
              </div>
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}