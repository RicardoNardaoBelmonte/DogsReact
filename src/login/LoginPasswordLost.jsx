import React from 'react'
import Input from '../Components/Forms/Input.jsx';
import Button from '../Components/Forms/Button.jsx';
import UseForm from '../Hooks/UseForm.jsx';
import UseFetch from '../Hooks/UseFetch.jsx';
import { PASSWORD_LOST } from '../api/Api.jsx';
import Error from '../help/Error.jsx';
import Head from '../help/Head.jsx';

const LoginPasswordLost = () => {

  const login = UseForm();
  const {data, loading, error, request} = UseFetch();

  function handleSubmit(e){
    if(login.validate()){
      e.preventDefault();
      const {url, options} = PASSWORD_LOST({login: login.value, url: window.location.href.replace('perdeu', 'reset')});
      request(url, options);
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Lost Password"/>
      <h1 className='title'>Lost your password?</h1>
      {data ? <p style={{color: '#4c1'}}>{data}</p> :
        <form onSubmit={handleSubmit}>
          <Input label="Email / User" type="text" name="login" {...login}/>
          {loading ?  <Button disabled >Sending...</Button> : <Button>Send Email</Button>}
        </form> }

      <Error error={error}/>
    </section>
  )
} 

export default LoginPasswordLost
