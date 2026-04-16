import React from 'react';
import { Bell, Menu, User } from 'lucide-react';

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="h-[60px] bg-white border-b flex items-center justify-between px-4 fixed top-0 left-[260px] w-[calc(100%-260px)] z-10">
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-800 p-2">
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800 relative">
          <Bell size={24} />
          {/* Mock notification dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded-md shadow-sm">
          <User size={18} className="mr-2" />
          <span className="text-sm font-medium uppercase">{user.username || 'User'}</span>
        </button>
      </div>
    </div>
  );
}
