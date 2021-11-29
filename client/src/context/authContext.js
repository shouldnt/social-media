import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const saveTokenToLocal = (token) => {
  window.localStorage.setItem('jwtToken', token || '');
}
export const getTokenFromLocal = () => {
  return window.localStorage.getItem('jwtToken') || '';
}
const removeTokenFromLocal = () => {
  window.localStorage.removeItem('jwtToken');
}
const saveAvatarToLocal = (fileName) => {
  window.localStorage.setItem('avatar', fileName);
}
const getAvatarfromLocal = () => {
  return window.localStorage.getItem('avatar') || '';
}
const initialState = {
  user: null
}
if(getTokenFromLocal()) {
  const decodedToken = jwtDecode(getTokenFromLocal());
  if(decodedToken.exp * 1000 < Date.now()) {
    removeTokenFromLocal();
  } else {
    initialState.user = {
      username: decodedToken.username,
      email: decodedToken.email,
      token: getTokenFromLocal(),
    };
    initialState.avatar = getAvatarfromLocal();
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => { },
  logout: () => { }
});

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null
      }
    }
    case "SET_AVATAR": {
      return {
        ...state,
        avatar: action.payload
      }
    }
    default:
      return state;
  }
}
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    saveTokenToLocal(userData.token);
    dispatch({type: 'LOGIN', payload: userData})
  }
  const logout = () => {
    removeTokenFromLocal();
    dispatch({type: 'LOGOUT' });
  }
  const setAvatar = (imgLink) => {
    saveAvatarToLocal(imgLink);
    dispatch({type: 'SET_AVATAR', payload: imgLink});
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        avatar: state.avatar,
        login,
        logout,
        setAvatar
      }}
      { ...props }
    />
  )
}
export { AuthContext, AuthProvider };

