import {Link, useNavigate, useLocation} from 'react-router-dom';

function Header ({logo, userEmail, loggedIn, handleExit}) {
  const navigate = useNavigate();
  const location = useLocation();

  function signOut(){
    localStorage.removeItem('token');
    navigate('/sign-in');
    handleExit();
  }

    return (
      <header className="header root__section">
        <img src={logo} alt="Логатип проекта" className="header__logo"/>
        <ul className="header__nav">
          {loggedIn ? <li className="header__direction">{userEmail}</li> : ""}
          {location.pathname === "/my-profile" ? <li><button onClick={signOut} className="navbar__link header__button">Выйти</button></li> : ""}
          {location.pathname === "/sign-in" ? <li><Link to="sign-up" className="header__direction">Регистрация</Link></li> : ""}
          {location.pathname === "/sign-up" ? <li><Link to="sign-in" className="header__direction">Вход</Link></li> : ""}
        </ul>
      </header>
    );
}

export default Header;