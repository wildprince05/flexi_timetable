import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/client';
import { Users, BookOpen, CalendarDays } from 'lucide-react';

export default function FacultyDashboard() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, slotsRes] = await Promise.all([
        api.get('/faculty/profile'),
        api.get('/faculty/slots')
      ]);
      setProfile(profileRes.data);
      setSlots(slotsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const viewStudents = async (slotId) => {
    try {
      const res = await api.get(`/faculty/slots/${slotId}/students`);
      setEnrolledStudents(res.data);
      setSelectedSlot(slotId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl text-gray-800 font-light mb-4">Hi, Faculty!</h1>
      <div className="bg-[#E9ECEF] text-gray-700 py-3 px-4 rounded mb-6 text-sm">Faculty Dashboard</div>

      {profile && !location.pathname.includes('/timetable') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#17A2B8] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{profile.subject.name}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Assigned Subject</p>
            <div className="bg-[#138496] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90"> {profile.subject.credits} Credits </div>
            <BookOpen className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
          <div className="bg-[#FFC107] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{slots.length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Total Slots Assigned</p>
            <div className="bg-[#E0A800] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90"> Manage Slots ➔ </div>
            <CalendarDays className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
          <div className="bg-[#28A745] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{profile.maxCapacity}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Max Capacity per Slot</p>
            <div className="bg-[#218838] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90"> More info ➔ </div>
            <Users className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
        </div>
      )}

      {location.pathname.includes('/timetable') ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white border rounded shadow-sm">
                <div className="p-3 border-b bg-gray-50 text-gray-700 font-medium h-[50px] flex items-center">My Slots</div>
                <div className="p-4 overflow-y-auto max-h-[300px]">
                   {slots.map(s => (
                      <div key={s.id} className="border p-4 mb-2 rounded cursor-pointer hover:bg-gray-50 flex justify-between items-center" onClick={() => viewStudents(s.id)}>
                         <div>
                            <p className="font-semibold">{s.startTime} - {s.endTime}</p>
                            <p className="text-sm text-gray-600">Room: {s.roomNumber} | Seats left: {s.availableSeats}</p>
                         </div>
                         <button className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded">View Students</button>
                      </div>
                   ))}
                   {slots.length === 0 && <p className="text-sm text-gray-500 italic">No slots assigned yet.</p>}
                </div>
             </div>

             <div className="bg-white border rounded shadow-sm">
                <div className="p-3 border-b bg-gray-50 text-gray-700 font-medium h-[50px] flex items-center">Enrolled Students</div>
                <div className="p-4 overflow-y-auto max-h-[300px]">
                   {selectedSlot ? (
                      enrolledStudents.length > 0 ? (
                         <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-100 border-b">
                               <tr>
                                  <th className="py-2 px-4">Name</th>
                                  <th className="py-2 px-4">Dept</th>
                                  <th className="py-2 px-4">Status</th>
                               </tr>
                            </thead>
                            <tbody>
                               {enrolledStudents.map(e => (
                                  <tr key={e.id} className="border-b">
                                     <td className="py-2 px-4">{e.student.name}</td>
                                     <td className="py-2 px-4">{e.student.department}</td>
                                     <td className={`py-2 px-4 font-semibold ${e.status === 'ENROLLED' ? 'text-green-600' : 'text-orange-500'}`}>{e.status}</td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                      ) : (
                         <p className="text-sm text-gray-500 italic">No students enrolled in this slot.</p>
                      )
                   ) : (
                      <p className="text-sm text-gray-500 italic">Select a slot to view students.</p>
                   )}
                </div>
             </div>
         </div>
      ) : (
         <div className="bg-white border text-center p-8 rounded shadow-sm text-gray-600">
            <p>Use the sidebar to view your assigned Timetable and enrolled students.</p>
         </div>
      )}
    </div>
  );
}
