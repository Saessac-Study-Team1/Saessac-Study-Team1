import React, { useState, useRef }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';
import imageCompression from 'browser-image-compression';

export default function MyProfileImg({user}) {
  const [preview, setPreview] = useState(undefined);
  const imgInput = useRef(null);

  // 이미지 변경 input 과 button 연결
  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  }
  
  // 이미지 변경 및 서버에 저장
  const SaveImgFile = async (e) => {
    e.preventDefault();

    // 이미지 리사이징(화질유지, 파일크기 압축)
    const imageFile = e.target.files[0];
    console.log(`원본파일 크기는 ${imageFile.size}`);
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 170,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(`압축한 파일크기는 ${compressedFile.size}`);

      URL.revokeObjectURL(URL.revokeObjectURL(preview)); // preview url 폐기
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(result => {
        setPreview(result);
      })

      // 압축한 이미지 파일 서버로 전송
      const formData = new FormData();
      formData.append('file', compressedFile);
      const config ={
        headers : {
          Authorization: getLoginCookie(),
          'content-type': 'multipart/form-data'
        }
      };
      axios.post('http://34.168.215.145/user/picture', formData, config)
      .then((res) => {
        console.log('서버에 이미지 등록완료');
      })
      .catch((err) => {
        console.log('이미지등록에러');
        })
    } catch (err) {
      console.log(err);
    }
  }  

  // 이미지 삭제
  const deleteImgFile = () => {
    axios.put(`http://34.168.215.145/user/picture`, {}, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      console.log('이미지 삭제 완료');
    })
    .catch((err) =>{
      console.log(err);
    })
    setPreview(URL.revokeObjectURL(preview));   // preview 폐기
  }
  
  return (
      <div className="mypage-container__topleft">
        {/* preview가 빈 문자열이라면 디폴트이미지를, 빈문자열이 아니라면 preview이미지를 */}
        <img src={preview !== undefined ? preview : `http://34.168.215.145/${user.userPicture}`}
        width="50px" alt="profile image" />
        <input 
              ref={imgInput} 
              className="mypage-btn blackbtn"
              type="file" 
              accept="image/*"
              onChange={(e)=>SaveImgFile(e)}
              style={{display:"none"}}
              ></input>
        <button className="mypage-btn blackbtn"  onClick={(e)=>onImgInputBtnClick(e)}>이미지 변경</button>        
        <button className="mypage-btn" onClick={()=>deleteImgFile()}>이미지 제거</button>
      </div>
    );
  
}

