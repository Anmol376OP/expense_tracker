import Login from './pages/login';
import Home from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user'))
    return props.children
  else
    return Navigate('/', { replace: true })
}

export default App;
