import React from 'react';
import '../public/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Components/Home.jsx';
import Login from './login/Login.jsx';
import { UserStorage } from './UserContext.jsx';
import User from './Components/User/User.jsx';
import ProtectedRoute from './help/ProtectedRoute.jsx';
import Photo from './Components/Photo/Photo.jsx';
import UserProfile from './Components/User/UserProfile.jsx';
import NotFound from './help/NotFound.jsx';


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <UserStorage>
            <Header/>
            <main className='AppBody'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login/*' element={<Login/>}/>
                <Route path='conta/*' element={<ProtectedRoute><User/></ProtectedRoute>}/>
                <Route path='photo/:id' element={<Photo/>}/>
                <Route path='profile/:user' element={<UserProfile/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </main>
            <Footer/>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
