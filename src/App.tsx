import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard.tsx';
import Category from './pages/Category.tsx';
import Test from './pages/Test.tsx';
import User from './pages/User.tsx';
import Settings from './pages/Settings';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ConfirmEmailCode from './pages/Authentication/ConfirmEmailCode.tsx';
import ClientQuizTest from './pages/ClientQuizTest.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    if (pathname === '/') navigate('/dashboard');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          path={`/dashboard`}
          element={
            <>
              <PageTitle title="Admin | Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Admin | Category" />
              <Category />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <PageTitle title="Admin | Test" />
              <Test />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="Admin | User" />
              <User />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Admin | Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/confirm"
          element={
            <>
              <PageTitle title="Confirm" />
              <ConfirmEmailCode />
            </>
          }
        />
        <Route
          path="/client/quiz/:id"
          element={
            <>
              <PageTitle title="Client quiz test" />
              <ClientQuizTest />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
