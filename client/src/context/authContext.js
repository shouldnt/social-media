import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const saveTokenToLocal = (token) => {
  window.localStorage.setItem('jwtToken', token || '');
}
const getTokenFromLocal = () => {
  return window.localStorage.getItem('jwtToken') || '';
}
const removeTokenFromLocal = () => {
  window.localStorage.removeItem('jwtToken');
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

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout
      }}
      { ...props }
    />
  )
}
export { AuthContext, AuthProvider };

