import React from 'react'
import Input from '../Components/Forms/Input';
import Button from '../Components/Forms/Button';
import Useform from '../Hooks/Useform';
import { userContext } from '../UserContext';
import UseFetch from '../Hooks/UseFetch';
import Error from '../help/Error.jsx';
import { USER_POST } from '../api/Api.jsx';
import Head from '../help/Head.jsx';



const LoginCreate = () => {

  const username = Useform();
  const email = Useform('email');
  const password = Useform('password');
  const {userLogin} = React.useContext(userContext);

  const {loading, error, request} = UseFetch()

  async function handleSubmit(e){
    e.preventDefault();
    const {url, options} = USER_POST({username: username.value, email: email.value, password: password.value});
    const {response} = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }  

  return (
    <section className="animeLeft">
      <Head title="Create Account"/>
      <h1 className='title'>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username}/>
        <Input label="Email" type="email" name="email" {...email}/>
        <Input label="Password" type="password" name="password" {...password}/>
        {loading ? (<Button>Registering...</Button>) : (<Button>Register</Button>)}
        <Error error={error}/>
      </form>
    </section>
  )
}

export default LoginCreate
