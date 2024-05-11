import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import EditUser from './components/EditUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path='/edit/:id' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
