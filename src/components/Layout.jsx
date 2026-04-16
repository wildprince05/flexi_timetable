import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#f4f6fa] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f6fa] p-6 mt-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
