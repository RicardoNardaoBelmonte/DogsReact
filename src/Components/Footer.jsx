import React from 'react';
import styles from '../../public/Footer.module.css';
import dogsFooter from '../Assets/dogs-footer.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div><img src={dogsFooter} alt="" /></div>
      <p>Dogs: Some rights reserved</p>
    </footer>
  )
}

export default Footer
