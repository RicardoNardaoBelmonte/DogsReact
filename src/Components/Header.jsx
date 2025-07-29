import React from 'react'
import styles from '../../public/Header.module.css'
import { Link } from 'react-router-dom'
import dogFace from '../Assets/dogs.svg'
import { userContext } from '../UserContext'


const Header = () => {

  const {data} = React.useContext(userContext);

  return (
    <header className={styles.header}> 
       <nav className={`${styles.nav} container`} style={{display: 'flex'}}>
        <Link className={styles.logo} to='/' aria-label='Dogs - home'><img src={dogFace} alt="" /></Link>
        {data ? <Link className={styles.login} to='/conta'>{data.nome}</Link> :
        <Link className={styles.login} to='/login'>Login / Criar</Link>}
       </nav>
    </header>
  )
}

export default Header
