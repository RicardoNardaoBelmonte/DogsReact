import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Components/Forms/Input.jsx';
import Button from '../Components/Forms/Button.jsx';
import Useform from '../Hooks/Useform.jsx';
import { userContext } from '../UserContext.jsx';
import Error from '../help/Error.jsx';
import styles from '../../public/LoginForm.module.css';
import stylesBtn from '../Components/Forms/Button.module.css'
import Head from '../help/Head.jsx';

const LoginForm = () => {   
  const username = Useform();
  const password = Useform();

  const {userLogin, error, loading } = React.useContext(userContext);

  async function handleSubmit(e){
    e.preventDefault(); 

    if (username.validate() && password.validate()){
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Login"/>
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label='User' type='text' name='username' {...username}/>
        <Input label='Password' type='password' name='password' {...password}/>
        {loading ? (<Button>loading...</Button>) : (<Button>Login</Button>)}
        <Error error={error}/>
      </form>
      <Link className={styles.lost} to="/login/perdeu">Lost your password?</Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Register</h2>
        <p>Still don't have an account? Register now</p>
        <Link className={stylesBtn.button} to="/login/criar">Register</Link>  
      </div>
    </section>
  )
}

export default LoginForm
