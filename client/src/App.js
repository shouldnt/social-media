import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.css'
import 'remixicon/fonts/remixicon.css'
import './App.scss';

import { AuthProvider } from './context/authContext';
import AuthRoute from './utils/AuthRoute';
import PrivateRoute from './utils/PrivateRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar></MenuBar>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={
            <AuthRoute>
              <Login/>
            </AuthRoute>
            } />
          <Route exact path="/register"
            element={
              <AuthRoute>
                <Register/>
              </AuthRoute>
            }
          />
          <Route exact path="/posts/:postId" element={<SinglePost/>} />
          <Route exact path="/profile"
            element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
            }
          />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
