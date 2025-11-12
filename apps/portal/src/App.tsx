import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import PortalHome from './pages/PortalHome';
import TravelChecklist from './pages/TravelChecklist';
import PhotoPracticeHub from './pages/PhotoPracticeHub';
import { LAST_VISITED_KEY } from './utils/storage';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      localStorage.setItem(LAST_VISITED_KEY, location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      const lastVisited = localStorage.getItem(LAST_VISITED_KEY);
      if (lastVisited) {
        localStorage.setItem(LAST_VISITED_KEY, lastVisited);
      }
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PortalHome />} />
        <Route path="/travel" element={<TravelChecklist />} />
        <Route path="/photo" element={<PhotoPracticeHub />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
