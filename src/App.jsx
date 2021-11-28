import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import Dashboard from './Components/Dashboard/Dashboard';
import SignupPage from './Components/SignupPage/SignupPage';

function App() {

  function requireAuth(nextState, replace, next) {
    const authenticated = localStorage.getItem('user');
    if (!authenticated) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
    next();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>} onEnter={requireAuth}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
