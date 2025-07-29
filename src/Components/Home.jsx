import React from 'react'
import Feed from './Feed/Feed.jsx'; 
import Head from '../help/Head.jsx';

const Home = () => {
  return (
    <section className='container mainContainer'>
        <Head title="Photos" description="Dogs website home with posted photo feed"/>
        <Feed/>
    </section>
  )
} 

export default Home
