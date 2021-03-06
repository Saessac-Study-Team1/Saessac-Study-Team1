import "../css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "../page/Sign/Signup";
import Signin from "../page/Sign/Signin";
import Main from "./Main";
import PostDetail from "../page/Post/PostDetailPage";
import MyPage from "../page/MyPage/MyPage";
import PostWritePage from "../page/Post/PostWritePage";
import PostListPage from "page/Post/PostListPage";
import PostEditPage from "page/Post/PostEditPage";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSignState } from "../action/action";
import { getLoginCookie } from "../lib/cookie";
import Loading from "../components/Loading";
import Weather from "./Weather";
import Chat from "./Chat";

const axios = require("axios");

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/user/checklogin", {
        headers: { authorization: getLoginCookie() },
      });
      dispatch(setSignState(res.data.msg));
      setLoading(false);
    })();
  });

  if (loading) return <Loading></Loading>;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/signup"
          element={
            <RequireAuth option={false}>
              <Signup />
            </RequireAuth>
          }
        />
        <Route
          path="/signin"
          element={
            <RequireAuth option={false}>
              <Signin />
            </RequireAuth>
          }
        />
        <Route
          path="/mypage"
          element={
            <RequireAuth option={true}>
              <MyPage />
            </RequireAuth>
          }
        />
        <Route path="/postlist" element={<PostListPage />}></Route>
        <Route path="/postdetail/:id" element={<PostDetail />}></Route>
        <Route
          path="/postwrite"
          element={
            <RequireAuth option={true}>
              <PostWritePage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/postedit/:id"
          element={
            <RequireAuth option={true}>
              <PostEditPage />
            </RequireAuth>
          }
        ></Route>
        <Route path="/weather" element={<Weather />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
      <Link to="/">
        <p>??????</p>
      </Link>
      <Link to="/signup">
        <p>????????????</p>
      </Link>
      <Link to="/signin">
        <p>?????????</p>
      </Link>
      <Link to="/mypage">
        <p>???????????????</p>
      </Link>
      <Link to="/postlist">
        <p>??? ??????</p>
      </Link>
      <Link to="/postwrite">
        <p>??? ??????</p>
      </Link>
      <Link to="/chat">
        <p>??????</p>
      </Link>
    </div>
  );
}

export default App;
