import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

// option true = 로그인시에만 가능
// option false = 로그아웃시에만 가능
// option null = 둘다 가능
const RequireAuth = ({ children, option }) => {
  const state = useSelector(state => state.signinReducer)
  const location = useLocation();

  // 인증정보 갱신 추가하기
  if(option === null){
    return children
  } else if(option) {
    if(state.loginState) return children
    else return <Navigate to={'/signin'} state={location}></Navigate>
  } else {
    if(state.loginState){
      if(location.pathname === '/signin' || location.pathname === '/signup') return <Navigate to={'/'} state={location}></Navigate>
    } else return children
  }
}

export default RequireAuth