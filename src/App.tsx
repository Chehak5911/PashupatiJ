import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage, HomePage, ItemDetailsPage, LoginPage } from '@pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/items/:id" element={<ItemDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
