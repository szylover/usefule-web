import { Navigate, Route, Routes } from 'react-router-dom';
import PortalPage from './pages/PortalPage';
import TravelPage from './pages/TravelPage';
import PhotoPage from './pages/PhotoPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PortalPage />} />
      <Route path="/travel" element={<TravelPage />} />
      <Route path="/photo" element={<PhotoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
