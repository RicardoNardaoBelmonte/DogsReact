import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../UserContext';
import feed from '../../Assets/feed.svg';
import stats from '../../Assets/estatisticas.svg';
import add from '../../Assets/adicionar.svg';
import logout from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import UseMedia from '../../Hooks/UseMedia.jsx';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(userContext);
  const mobile = UseMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname])


  function handleLogout() {
    userLogout();
    navigate('/login'); 
  }

  return (
  <>
    {mobile && <button aria-label="Menu" className={`${styles.mobileButton}  ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
    <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
      <div style={mobile ? null : { display: 'flex', gap: '5rem' }}>
        <NavLink to="/conta" end>
          <img src={feed} alt="Feed" />
          {mobile && <span>My Account</span>} 
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <img src={stats} alt="Statistics" />
          {mobile && <span>Statistics</span>} 
        </NavLink>
        <NavLink to="/conta/postar">
          <img src={add} alt="Add Photo" />
          {mobile && <span>Add Photo</span>} 
        </NavLink>
      </div>
      <button onClick={handleLogout}>
        <img src={logout} alt="Logout" />
        {mobile && <span>Logout</span>} 
      </button>
    </nav>
  </>
  );
};

export default UserHeaderNav;