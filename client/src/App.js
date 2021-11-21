import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.css'
import './App.css';

import { AuthProvider } from './context/authContext';
import AuthRoute from './utils/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar></MenuBar>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={
              <AuthRoute>
                <Login/>
              </AuthRoute>
            } />
            <Route exact path="/register" element={
              <AuthRoute>
                <Register/>
              </AuthRoute>
            } />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
