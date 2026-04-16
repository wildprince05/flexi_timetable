import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/client';
import { Users, BookOpen, CalendarDays, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subRes, facRes, slotRes] = await Promise.all([
        api.get('/admin/subjects'),
        api.get('/admin/faculties'),
        api.get('/admin/slots')
      ]);
      setSubjects(subRes.data);
      setFaculties(facRes.data);
      setSlots(slotRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl text-gray-800 font-light mb-4">Hi, Admin!</h1>
      <div className="bg-[#E9ECEF] text-gray-700 py-3 px-4 rounded mb-6 text-sm">Admin Dashboard</div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#28A745] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{subjects.length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Total Subjects</p>
            <div className="bg-[#218838] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 cursor-pointer"> More info ➔ </div>
            <BookOpen className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
          <div className="bg-[#FFC107] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{faculties.length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Total Faculties</p>
            <div className="bg-[#E0A800] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 cursor-pointer"> More info ➔ </div>
            <Users className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
          <div className="bg-[#17A2B8] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{slots.length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Total Slots</p>
            <div className="bg-[#138496] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 cursor-pointer"> More info ➔ </div>
            <CalendarDays className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
          <div className="bg-[#DC3545] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">0</h3>
            <p className="z-10 text-sm opacity-90 pb-6">System Errors</p>
            <div className="bg-[#C82333] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 cursor-pointer"> More info ➔ </div>
            <BarChart2 className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
      </div>

      <div className="bg-white border p-4 rounded shadow-sm text-gray-800">
         {location.pathname.includes('/slots') ? (
            <div>
               <h2 className="text-xl font-semibold mb-4 border-b pb-2">Create New Slot</h2>
               <form className="grid grid-cols-2 gap-4" onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                     const formData = new FormData(e.target);
                     await api.post('/admin/slot', {
                        subjectId: formData.get('subjectId'),
                        facultyId: formData.get('facultyId'),
                        startTime: formData.get('startTime') + ':00',
                        endTime: formData.get('endTime') + ':00',
                        roomNumber: formData.get('roomNumber'),
                        maxSeats: parseInt(formData.get('maxSeats'))
                     });
                     alert('Slot Created Successfully!');
                     fetchData();
                     e.target.reset();
                  } catch (err) {
                     alert(err.response?.data?.message || 'Error creating slot');
                  }
               }}>
                  <div><label className="block text-sm">Subject</label> <select name="subjectId" className="border p-2 w-full rounded outline-none" required> <option value="">Select Subject</option> {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)} </select></div>
                  <div><label className="block text-sm">Faculty</label> <select name="facultyId" className="border p-2 w-full rounded outline-none" required> <option value="">Select Faculty</option> {faculties.map(f => <option key={f.id} value={f.id}>{f.name}</option>)} </select></div>
                  <div><label className="block text-sm">Start Time</label> <input type="time" name="startTime" className="border p-2 w-full rounded outline-none" required/></div>
                  <div><label className="block text-sm">End Time</label> <input type="time" name="endTime" className="border p-2 w-full rounded outline-none" required/></div>
                  <div><label className="block text-sm">Room Number</label> <input type="text" name="roomNumber" className="border p-2 w-full rounded outline-none" required/></div>
                  <div><label className="block text-sm">Max Seats</label> <input type="number" name="maxSeats" defaultValue="60" className="border p-2 w-full rounded outline-none" required/></div>
                  <div className="col-span-2"><button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 rounded shadow hover:bg-blue-700">Create Slot</button></div>
               </form>

               <h3 className="text-lg font-semibold mt-8 mb-2 border-b pb-2">Existing Slots</h3>
               <div className="overflow-auto max-h-[300px]">
                  <table className="w-full text-left text-sm border">
                     <thead className="bg-gray-100 border-b"><tr><th className="p-2 border-r">ID</th><th className="p-2 border-r">Faculty</th><th className="p-2 border-r">Time</th><th className="p-2">Room</th></tr></thead>
                     <tbody>{slots.map(s => <tr key={s.id} className="border-b"><td className="p-2 border-r">{s.id}</td><td className="p-2 border-r">{s.faculty.name} - {s.subject.name}</td><td className="p-2 border-r">{s.startTime} - {s.endTime}</td><td className="p-2">{s.roomNumber}</td></tr>)}</tbody>
                  </table>
               </div>
            </div>
         ) : (
            <p className="p-4 text-center text-gray-500 italic">Click on 'Manage Slots' in the sidebar to create and view timetable slots.</p>
         )}
      </div>

    </div>
  );
}
