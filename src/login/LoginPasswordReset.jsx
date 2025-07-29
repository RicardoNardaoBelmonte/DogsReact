import React from 'react'
import Input from '../Components/Forms/Input.jsx';
import Button from '../Components/Forms/Button.jsx';
import UseForm from '../Hooks/UseForm.jsx';
import UseFetch from '../Hooks/UseFetch.jsx';
import { PASSWORD_RESET } from '../api/Api';
import Error from '../help/Error.jsx';
import { useNavigate } from 'react-router-dom';
import Head from '../help/Head.jsx';


const LoginPasswordReset = () => {
  
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = UseForm();
  const {error, loading, request} = UseFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params  = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if(key) setKey(key);
    if(login) setLogin(login);
  }, [])


  async function handleSubmit(e){
    e.preventDefault(); 
    if(password.validate()){
      const {url, options} = PASSWORD_RESET({login, key, password: password.value});
      const response = await request(url, options);
      if(response.ok) navigate('/login');
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Reset Password"/>
      <h1 className='title'>Reset your Password</h1>
      <form onSubmit={handleSubmit}>
        <Input label="New Password" type="password" name="password" {...password}/>
        {loading ? <Button disabled>Resetting...</Button> : <Button>Reset</Button>}
      </form>
      <Error error={error}/>
    </section>
  )
}

export default LoginPasswordReset
