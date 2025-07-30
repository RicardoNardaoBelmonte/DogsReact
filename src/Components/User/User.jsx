import React from 'react';
import UserHeader from './UserHeader';
import { Route, Routes } from 'react-router-dom';
import Feed from '../Feed/Feed.jsx';
import UserPhotoPost from './UserPhotoPost.jsx';
import UserStats from './UserStats.jsx';
import { userContext } from '../../UserContext.jsx';
import NotFound from '../../help/NotFound.jsx';
import Head from '../../help/Head.jsx';

const User = () => {

  const {data} = React.useContext(userContext);

  return (
    <section className='container'>
      <Head title="My Account"/>
        <UserHeader/>
        <Routes>
            <Route path="/" element={<Feed user={data.id}/>}/>
            <Route path="/postar" element={<UserPhotoPost/>}/>
            <Route path="estatisticas" element={<UserStats/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </section>
  )
}

export default User
