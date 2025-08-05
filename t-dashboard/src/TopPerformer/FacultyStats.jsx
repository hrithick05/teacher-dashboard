import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { mockFacultyData, achievementTypes } from '../data/mockFaculty';

const getTotalAchievements = (faculty) => {
  return achievementTypes.reduce((sum, type) => {
    const val = faculty[type.key];
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const RankBadge = ({ rank }) => {
  const colors = [
    'bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900', // 1st
    'bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900',      // 2nd
    'bg-gradient-to-r from-orange-400 to-orange-200 text-orange-900' // 3rd
  ];
  let content = '';
  if (rank === 1) content = '🥇';
  else if (rank === 2) content = '🥈';
  else if (rank === 3) content = '🥉';
  else content = `#${rank}`;
  return (
    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold shadow ${colors[rank - 1] || 'bg-blue-200 text-blue-900'}`}>{content}</span>
  );
};

const Trophy = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 animate-bounce">
    <path d="M8 21h8M12 17v4M17 5V3H7v2M17 5a5 5 0 0 1 5 5c0 2.5-2 5-5 5M7 5a5 5 0 0 0-5 5c0 2.5 2 5 5 5" />
  </svg>
);

const FacultyStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const faculty = mockFacultyData.find(f => f.id === id);

  // Ranking logic
  const facultyList = mockFacultyData.filter(f => f.id !== 'TARGET');
  const rankedFaculty = facultyList
    .map(faculty => ({
      ...faculty,
      totalAchievements: getTotalAchievements(faculty)
    }))
    .sort((a, b) => b.totalAchievements - a.totalAchievements);
  const rank = rankedFaculty.findIndex(f => f.id === id) + 1;

  if (!faculty) {
    return <div className="p-8 text-center text-red-600">Faculty not found.</div>;
  }

  const chartData = achievementTypes.map(type => ({
    name: type.shortLabel,
    value: faculty[type.key] || 0,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-10 px-2">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 p-8 flex items-center gap-6 relative">
          {(rank === 1 || rank === 2 || rank === 3) && <div className="absolute top-4 right-4"><Trophy /></div>}
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg border-4 border-blue-300 dark:border-blue-600">
            {getInitials(faculty.name)}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center">{faculty.name}<RankBadge rank={rank} /></h2>
            <div className="text-blue-100 text-lg font-medium">{faculty.designation} - {faculty.department}</div>
            <div className="mt-2 text-white/90 font-semibold">Total Achievements: <span className="text-yellow-200 text-xl">{getTotalAchievements(faculty)}</span></div>
          </div>
        </div>
        <div className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <h4 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-200">Achievement Breakdown</h4>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#1976d2' }} />
                <YAxis tick={{ fontSize: 14, fill: '#1976d2' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" radius={[8, 8, 0, 0]} isAnimationActive={true}>
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button
            className="mt-8 px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
            onClick={() => navigate(-1)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Rankings
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
      `}</style>
    </div>
  );
};

export default FacultyStats;
