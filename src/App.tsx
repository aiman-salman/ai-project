import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { app } from './firebase';
import { getAuth } from 'firebase/auth'
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { StationsPage } from './components/stations/StationsPage';
import { UsersPage } from './components/users/UsersPage';
import SignUp  from './pages/SignUp'
import SignIn  from './pages/SignIn'
import { StationProvider } from './context/StationContext';

const auth = getAuth(app)


function App() {

  return (
    <BrowserRouter>
      <StationProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/stations" element={<StationsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Routes>
        </StationProvider>
    </BrowserRouter>
  );
}

export default App;