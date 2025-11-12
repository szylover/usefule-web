import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import Breadcrumbs from './Breadcrumbs';
import StatusToaster from './StatusToaster';

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <Breadcrumbs path={location.pathname} />
        <div className="page-content">{children}</div>
      </main>
      <StatusToaster />
    </div>
  );
};

export default Layout;
