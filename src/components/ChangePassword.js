import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function ChangePassword(){
  const [pwPopup, setPwPopup] = useState(false);
  const [currentPw, setCurrentPw] = useState();
  const [newPw, setNewPw] = useState();
  const [newPwCheck, setNewPwCheck] = useState();
  const [currentPwMsg, setCurrentPwMsg] = useState();
  const [pwMsg, setPwMsg] = useState();
  const [rePwMsg, setRePwMsg] = useState();

  const togglePwPopup = () => {
    setPwPopup(!pwPopup);
  };

  // 비밀번호 유효성검사
  const isValidPassword = (str) => {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(str)
  }

  //현재 비밀번호
  const inputCurrentPw = (e) => {
    setCurrentPw(e.target.value);
    isValidPassword(e.target.value) ? setCurrentPwMsg(<p>비밀번호가 조건에 만족합니다</p>) : setCurrentPwMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요</p>)
  }
  // 새 비밀번호
  const inputNewPw = (e) => {
    setNewPw(e.target.value);
    if( currentPw === e.target.value) {
      setPwMsg(<p>현재 비밀번호와 같습니다</p>);
    } else if( currentPw !== e.target.value && isValidPassword(e.target.value) ) {
      setPwMsg(<p>비밀번호가 조건에 만족합니다</p>) 
    } else if (currentPw !== e.target.value && !isValidPassword(e.target.value)) {
      setPwMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요</p>)
    }
  }

  // 새 비밀번호 확인
  const inputNewPwCheck = (e) => {
    setNewPwCheck(e.target.value);
    if(currentPw === e.target.value && newPw === e.target.value) {
      setRePwMsg(<p>현재 비밀번호와 같아 비밀번호가 변경되지 않습니다</p>)
    } else if ( newPw === e.target.value) {
      setRePwMsg(<p>비밀번호가 일치합니다</p>)
    } else {
      setRePwMsg(<p>비밀번호가 일치하지 않습니다</p>)
    }
  } 

  // 비밀번호 변경
  let password = {
    "currentuserpassword":currentPw,
    "userpassword":newPw
    }
  const submitChangedPw = () => {
    if(currentPw === newPw && newPw === newPwCheck) {
      return;
    }
    if(currentPw !== newPw && newPw === newPwCheck) {
    axios.put(`http://34.168.215.145/user/password/`, password, {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      console.log('비번변경');
    })
    .catch((err) => { 
      console.log(err);
    })
    }
  }
  return (
    <div className="mypage-bottom__wrapper">
      <div className="mypage-bottomleft__title">
        <h3>비밀번호 변경</h3>
      </div>
      <div className="mypage-bottomright__content">
        { pwPopup ? (
          <form className="mypage-bottomright__passwordForm">
            <ul className="mypage-bottomright__pwFormContainer">
              <li className="mypage-bottomright__pwFormWrapper">
                <div className="mypage-bottomright__pwDescription">현재 비밀번호</div>
                <input
                type="password"
                className="mypage-bottomright__pwInput" 
                value={currentPw} 
                onChange={inputCurrentPw}></input>
                {currentPwMsg}
              </li>
              <li className="mypage-bottomright__pwFormWrapper">
                <div className="mypage-bottomright__pwDescription">새 비밀번호</div>
                <input
                type="password"
                className="mypage-bottomright__pwInput" 
                value={newPw}
                onChange={inputNewPw}
                ></input>
                {pwMsg}
              </li>
              <li className="mypage-bottomright__pwFormWrapper">
                <div className="mypage-bottomright__pwDescription">새 비밀번호 확인</div>
                <input
                type="password"
                className="mypage-bottomright__pwInput"
                value={newPwCheck}
                onChange={inputNewPwCheck}
                ></input>
                {rePwMsg}
              </li>
            </ul>
            <div className="mypage-bottomright__buttonwrapper">
              <button className="mypage-btn blackbtn" onClick={() => {
                togglePwPopup();
                submitChangedPw();
                }}
                >저장</button>
            </div>
          </form>
        ) : (
          <div className="mypage-bottomright__buttonwrapper">
            <button className="mypage-btnUnderline" onClick={togglePwPopup}>변경</button>
          </div>
        )}
      </div>
    </div>
  );
}