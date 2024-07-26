import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard.tsx';
import Category from './pages/Category.tsx';
import Test from './pages/Test.tsx';
import User from './pages/User.tsx';
// import Settings from './pages/Settings';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ConfirmEmailCode from './pages/Authentication/ConfirmEmailCode.tsx';
import ClientQuizTest from './pages/client/ClientQuizTest.tsx';
import ClientDashboard from './pages/client/ClientDashboard.tsx';
import ResetPassword from './pages/Authentication/ResetPasword.tsx';
import ClientQuizResult from './pages/client/ClientQuizResult.tsx';
import { setConfig } from './common/api/token.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = localStorage.getItem('token');
  const role = localStorage.getItem('ROLE');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'PrintScreen' || (event.shiftKey && (event.metaKey || event.key === 'Meta'))) {
        alert('Скрееншот олиш тақиқланган❗❌');
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setConfig();
    const refresh = sessionStorage.getItem('refreshes');
    setTimeout(() => setLoading(false), 1000);

    if (!tokens) {
      sessionStorage.removeItem('refreshes');
      if (!pathname.startsWith('/auth')) navigate('/auth/signin');
    } else if (!refresh) sessionStorage.setItem('refreshes', 'true');
  }, [tokens, pathname, navigate]);

  useEffect(() => {
    setConfig();
    window.scrollTo(0, 0);

    if (pathname === '/') {
      if (role === 'ROLE_ADMIN') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/dashboard');
      } else if (role === 'ROLE_CLIENT') {
        if (!tokens) navigate('/auth/signin');
        else navigate('/client/dashboard');
      }
    }

    if (tokens && tokenExpiry) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiry)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('ROLE');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('ROLE');
    }

    if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/signin');
    if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');
  }, [pathname, tokens, navigate]);

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
        {/*<Route*/}
        {/*  path="/settings"*/}
        {/*  element={*/}
        {/*    <>*/}
        {/*      <PageTitle title="Admin | Settings" />*/}
        {/*      <Settings />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/>*/}
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
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset password" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/client/quiz/:id"
          element={
            <>
              <PageTitle title="Client | Quiz test" />
              <ClientQuizTest />
            </>
          }
        />
        <Route
          path="/client/quiz/result"
          element={
            <>
              <PageTitle title="Client | Quiz Result" />
              <ClientQuizResult />
            </>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <>
              <PageTitle title="Client | Dashboard" />
              <ClientDashboard />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
