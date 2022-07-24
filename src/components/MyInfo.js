import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function MyInfo({userID, nickname, introduce, setNickname, setIntroduce}){
  const [editPopup, setEditPopup] = useState(false);

  // 닉네임 수정 & 저장 버튼 클릭시
  const toggleEiditPopup = () => {
    setEditPopup(!editPopup);
  };

  // 닉네임 수정
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }
  // 자기소개 수정
  const handleIntroChange = (e) => {
    setIntroduce(e.target.value);
  }

  let data = {
    "nickname":nickname,
    "info":introduce
  }

  const submitNickname = () => {
    axios.put(`http://34.168.215.145/user/`, data, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      console.log('put작동');
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  return (
  <div className="mypage-container__topright">
    {editPopup ? (
      <div className="mypage-wrapper__topright">
        <form className="mypage-inputForm__topright">
        <input 
        type="text"
        placeholder="바꿀 닉네임을 작성해주세요"
        className="mypage-inputForm__nickname"
        value={nickname}
        onChange={handleNicknameChange}></input>
        <input
        type="textarea"
        placeholder="자기 소개를 작성해주세요"
        className="mypage-inputForm__introduce"
        value={introduce}
        onChange={handleIntroChange}
        maxLength="70"
        ></input>
        <div className="mypage-btnwrapper__topright">
          <button className="mypage-btn blackbtn" onClick={() => {
            toggleEiditPopup();
            submitNickname();
            }} >저장</button>
        </div>
        </form>
      </div>
    ) : (
      <div className="mypage-wrapper__topright">
        <div className="mypage-topright__nickname">
          <span>{nickname} </span>
          <span>{userID}</span>
        </div>
        <p className="mypage-topright__introduce">{introduce}</p>
        <button className="mypage-btnUnderline" onClick={toggleEiditPopup}>수정</button>
      </div>
    )}
  </div>
  );
}