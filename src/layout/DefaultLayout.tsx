import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalModal from '../components/modal/modal.tsx';
import { IoIosLogOut } from 'react-icons/io';
import AddButtons from '../components/buttons/buttons.tsx';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const { pathname } = useLocation();
  const role = localStorage.getItem('ROLE');
  const toggleLogout = () => setIsLogout(!isLogout);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {!(pathname.startsWith('/auth') || role === 'ROLE_ADMIN' || pathname.startsWith('/archive') || pathname.startsWith('/client/quiz/')) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!(pathname.startsWith('/auth') || pathname.startsWith('/archive') || pathname.startsWith('/client/quiz/')) && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleLogout={toggleLogout} />
          )}

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      <GlobalModal isOpen={isLogout} onClose={toggleLogout}>
        <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
          <IoIosLogOut className={`text-red-600`} size={100} />
          <p className="text-2xl text-center text-black-2 dark:text-white">Сиз аниқ тизимдан чиқмоқчимисиз?</p>
          <div className={`flex items-center mt-5 mb-3 gap-5`}>
            <AddButtons children={`Ёпиш`} onClick={toggleLogout} />
            <AddButtons children={'Ха'} onClick={() => {
              navigate('/auth/signin');
              localStorage.removeItem('token');
              localStorage.removeItem('tokenExpiry');
              localStorage.removeItem('ROLE');
              sessionStorage.clear();
            }} />
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default DefaultLayout;
