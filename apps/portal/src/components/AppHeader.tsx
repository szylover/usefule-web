import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-logo">
          Usefule Web Portal
        </Link>
        <nav className="app-nav">
          <Link to="/travel" className="app-nav__link">
            全球旅游清单
          </Link>
          <Link to="/photo" className="app-nav__link">
            修图练习中心
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
