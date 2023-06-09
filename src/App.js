
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Login} from './pages/signup-signin/Login';

import Home from './pages/signup-signin/Home/Home';
import { ToastContainer } from 'react-toastify';
import SignUp  from '../src/pages/signup-signin/SignUp';
import { Dashboard } from './pages/dashboard/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './config/firebase-config';
import { useDispatch } from 'react-redux';





function App() {

const dispatch = useDispatch();
  onAuthStateChanged(auth,(user)=>{
    user?.uid && dispatch(getUserAction)
  })
  return (
    <div className=''>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/signup" element={<SignUp/>}/>
<Route path="/signin" element={<Login/>}/>

{/* /*private routers*/ }
<Route path='/dashboard' element={<Dashboard/>} />
{/* <Route path="/dashboard" element={<Dashboard/>}/> */}


</Routes>
<ToastContainer />
    </div>
  );
}

export default App;
