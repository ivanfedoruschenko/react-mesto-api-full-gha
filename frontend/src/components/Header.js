import headerLogo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Место' className='header__logo' />
      <div className='header__container'>
        <p className='header__mail'>{props.email}</p>
        <Link
          onClick={props.link === 'Выйти' && props.signOut}
          className={`blackout header__link ${
            props.link === 'Выйти' && 'header__link_style_grey'
          }`}
          to={props.path}
        >
          {props.link}
        </Link>
      </div>
    </header>
  );
}
