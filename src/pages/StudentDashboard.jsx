import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/client';
import { Book, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function StudentDashboard() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, enrollmentsRes, slotsRes] = await Promise.all([
        api.get('/student/profile'),
        api.get('/student/enrollments'),
        api.get('/student/slots')
      ]);
      setProfile(profileRes.data);
      setEnrollments(enrollmentsRes.data);
      setSlots(slotsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (slotId) => {
    try {
      const res = await api.post(`/student/enroll/${slotId}`);
      alert(res.data.message);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error enrolling');
    }
  };

  const totalEnrolledCredits = enrollments
    .filter(e => e.status === 'ENROLLED')
    .reduce((acc, curr) => acc + curr.slot.subject.credits, 0);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-gray-800 font-light mb-4">Hi, welcome back!</h1>
      <div className="bg-[#E9ECEF] text-gray-700 py-3 px-4 rounded mb-6 text-sm">Dashboard</div>

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#28A745] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{profile.requiredCredits}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Required Credits</p>
            <div className="bg-[#218838] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 hover:text-white hover:bg-[#1e7e34] cursor-pointer flex justify-center items-center">
               More info ➔
            </div>
            <Book className="absolute right-4 top-4 opacity-20" size={60} />
          </div>

          <div className="bg-[#FFC107] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{totalEnrolledCredits}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Enrolled Credits</p>
            <div className="bg-[#E0A800] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 hover:text-white hover:bg-[#d39e00] cursor-pointer flex justify-center items-center">
               More info ➔
            </div>
            <CheckCircle className="absolute right-4 top-4 opacity-20" size={60} />
          </div>

          <div className="bg-[#17A2B8] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{enrollments.filter(e => e.status === 'ENROLLED').length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Total Enrolled Slots</p>
            <div className="bg-[#138496] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 hover:text-white hover:bg-[#117a8b] cursor-pointer flex justify-center items-center">
               More info ➔
            </div>
            <Clock className="absolute right-4 top-4 opacity-20" size={60} />
          </div>

          <div className="bg-[#DC3545] text-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-4xl font-bold z-10">{enrollments.filter(e => e.status === 'WAITLISTED').length}</h3>
            <p className="z-10 text-sm opacity-90 pb-6">Waitlisted</p>
            <div className="bg-[#C82333] absolute bottom-0 left-0 right-0 py-1 text-center text-xs text-white/90 hover:text-white hover:bg-[#bd2130] cursor-pointer flex justify-center items-center">
               More info ➔
            </div>
            <AlertTriangle className="absolute right-4 top-4 opacity-20" size={60} />
          </div>
        </div>
      )}

      {location.pathname.includes('/timetable') ? (
         <div className="bg-white border p-4 rounded shadow-sm text-gray-800">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">My Time Table</h2>
            <div className="overflow-auto">
               {enrollments.length > 0 ? (
                  <table className="w-full text-left text-sm border-collapse">
                     <thead><tr className="bg-gray-100 border-b"><th className="p-2 border">Subject</th><th className="p-2 border">Faculty</th><th className="p-2 border">Time</th><th className="p-2 border">Room</th><th className="p-2 border">Status</th></tr></thead>
                     <tbody>
                        {enrollments.map(e => <tr key={e.id} className="border-b"><td className="p-2 border">{e.slot.subject.name}</td><td className="p-2 border">{e.slot.faculty.name}</td><td className="p-2 border text-blue-600 font-semibold">{e.slot.startTime} - {e.slot.endTime}</td><td className="p-2 border">{e.slot.roomNumber}</td><td className={`p-2 border font-bold ${e.status === 'ENROLLED' ? 'text-green-600' : 'text-orange-500'}`}>{e.status}</td></tr>)}
                     </tbody>
                  </table>
               ) : (
                  <p className="p-4 text-center text-gray-500 italic">You have no enrolled courses or waitlisted slots.</p>
               )}
            </div>
         </div>
      ) : location.pathname.includes('/selection') ? (
         <div className="bg-white border rounded shadow-sm">
            <div className="p-3 border-b bg-gray-50 text-gray-700 font-medium h-[50px] flex items-center">Available Slots to Select</div>
            <div className="p-4 overflow-y-auto">
               <ul className="text-sm space-y-4">
                  {slots.map(s => (
                     <li key={s.id} className="flex justify-between items-center p-4 border rounded hover:shadow-md transition bg-blue-50/20">
                        <div>
                           <strong className="text-base text-gray-800">{s.subject.name}</strong> <span className="text-gray-500 text-xs ml-2 uppercase">({s.roomNumber})</span><br />
                           <span className="text-gray-600">Faculty: {s.faculty.name}</span><br />
                           <span className="text-blue-600 font-semibold">{s.startTime} - {s.endTime}</span>
                           <p className="text-gray-500 text-xs mt-1"><span className="text-purple-600 font-medium">{s.subject.credits} Credits</span> | <span className="text-red-500 font-medium">{s.availableSeats} seats left</span></p>
                        </div>
                        <button onClick={() => handleEnroll(s.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">Enroll</button>
                     </li>
                  ))}
                  {slots.length === 0 && <span className="text-gray-500 italic">No available slots.</span>}
               </ul>
            </div>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white border rounded shadow-sm">
            <div className="p-3 border-b bg-gray-50 text-gray-700 font-medium h-[50px] flex items-center">Announcements</div>
            <div className="p-4 min-h-[150px] relative">
               <ul className="list-disc ml-5 text-sm text-gray-600">
                  <li>Course registration is open for current semester.</li>
                  <li>Check your credit limits before selecting slots.</li>
               </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
