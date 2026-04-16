import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BookOpen, LogOut, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const role = localStorage.getItem('role');

  const getLinks = () => {
    if (role === 'ROLE_ADMIN') {
      return [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Subjects', path: '/admin/subjects', icon: <BookOpen size={20} /> },
        { name: 'Manage Faculty', path: '/admin/faculty', icon: <Users size={20} /> },
        { name: 'Manage Slots', path: '/admin/slots', icon: <CalendarDays size={20} /> },
      ];
    } else if (role === 'ROLE_STUDENT') {
      return [
        { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
        { name: 'My Time Table', path: '/student/timetable', icon: <CalendarDays size={20} /> },
        { name: 'Slot Selection', path: '/student/selection', icon: <BookOpen size={20} /> },
      ];
    } else if (role === 'ROLE_FACULTY') {
      return [
        { name: 'Dashboard', path: '/faculty', icon: <LayoutDashboard size={20} /> },
        { name: 'My Time Table', path: '/faculty/timetable', icon: <CalendarDays size={20} /> },
      ];
    }
    return [];
  };

  const navLinks = getLinks();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="w-[260px] bg-[#2A3038] text-[#B1B3B9] h-screen flex flex-col fixed inset-y-0 left-0">
      <div className="h-[60px] bg-white text-gray-800 flex items-center justify-center font-bold text-xl px-4 border-b">
         {/* Mimicking RIT Logo */}
         <div className="flex flex-col items-center">
             <span className="text-xl leading-tight">RIT Timetable</span>
         </div>
      </div>
      <div className="p-3">
         <div className="bg-white text-gray-800 flex items-center p-2 rounded text-sm mb-4">
            <span className="mx-2">🔍</span> 
            <input type="text" placeholder="Search..." className="outline-none w-full"/>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {navLinks.map((link) => (
          <NavLink
             key={link.name}
             end
             to={link.path}
             className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive ? 'bg-[#007bff] text-white border-l-4 border-white' : 'hover:bg-[#1C2025]'
                }`
             }
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="p-4">
        <button onClick={handleLogout} className="flex items-center text-sm px-4 py-2 hover:bg-gray-800 w-full rounded">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
