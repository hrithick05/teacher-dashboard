import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { mockFacultyData, achievementTypes } from '../data/mockFaculty';

// Helper to calculate total achievements for a faculty member
const getTotalAchievements = (faculty) => {
  return achievementTypes.reduce((sum, type) => {
    const val = faculty[type.key];
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
};

// Helper to get initials for avatar
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Badge for top 3
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

const TopPerformer = () => {
  const navigate = useNavigate();
  // Exclude the 'Target' row
  const facultyList = mockFacultyData.filter(f => f.id !== 'TARGET');
  // Calculate total achievements for each faculty
  const rankedFaculty = facultyList
    .map(faculty => ({
      ...faculty,
      totalAchievements: getTotalAchievements(faculty)
    }))
    .sort((a, b) => b.totalAchievements - a.totalAchievements);

  // Prepare data for the bar chart (top 10 for clarity, or all if fewer)
  const chartData = rankedFaculty.map(faculty => ({
    name: faculty.name, // Use full name for clarity and to avoid missing labels
    total: faculty.totalAchievements
  }));

  // Top performer for highlighting
  const topPerformer = rankedFaculty[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-10 px-2">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 p-8 flex items-center gap-6">
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-white/30 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-blue-300 dark:border-blue-600">
            {getInitials(topPerformer.name)}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-1 flex items-center">
              Top Performer: {topPerformer.name}
              <RankBadge rank={1} />
            </h2>
            <div className="text-blue-100 text-lg font-medium">{topPerformer.designation} - {topPerformer.department}</div>
            <div className="mt-2 text-white/90 font-semibold">Total Achievements: <span className="text-yellow-200 text-2xl">{topPerformer.totalAchievements}</span></div>
          </div>
        </div>
        {/* Chart Section */}
        <div className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <h4 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">Faculty Achievement Rankings</h4>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" tick={{ fontSize: 14, fill: '#1976d2' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 14, fill: '#1976d2', overflow: 'visible' }} 
                  width={220} 
                  interval={0} 
                />
                <Tooltip wrapperStyle={{ fontSize: 14 }} />
                <Legend wrapperStyle={{ fontSize: 16 }} />
                <Bar dataKey="total" fill="#1976d2" radius={[0, 16, 16, 0]}
                  isAnimationActive={true}
                  label={{ position: 'right', fill: '#1976d2', fontWeight: 'bold' }}
                >
                  <LabelList dataKey="total" position="right" style={{ fill: '#1976d2', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Ranking Table */}
          <div className="mt-8">
            <h5 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-200">Ranking List</h5>
            <ol className="space-y-3">
              {rankedFaculty.map((faculty, idx) => (
                <li
                  key={faculty.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 shadow-md cursor-pointer group
                    ${idx === 0 ? 'bg-gradient-to-r from-yellow-200 via-yellow-100 to-white dark:from-yellow-900/40 dark:via-yellow-800/40 dark:to-gray-900 font-bold text-yellow-900 dark:text-yellow-100 border-2 border-yellow-300 dark:border-yellow-700' :
                      idx === 1 ? 'bg-gradient-to-r from-gray-200 via-gray-100 to-white dark:from-gray-700/40 dark:via-gray-800/40 dark:to-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700' :
                      idx === 2 ? 'bg-gradient-to-r from-orange-200 via-orange-100 to-white dark:from-orange-900/40 dark:via-orange-800/40 dark:to-gray-900 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700' :
                      'bg-blue-50 dark:bg-gray-800 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-gray-700'}
                    hover:scale-[1.025] hover:shadow-xl`}
                >
                  <span className="w-8 text-center text-lg font-bold">
                    {idx + 1}
                    <RankBadge rank={idx + 1} />
                  </span>
                  <span className="w-12 h-12 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center font-bold text-blue-900 dark:text-white text-xl shadow">
                    {getInitials(faculty.name)}
                  </span>
                  <span
                    className="flex-1 text-lg hover:underline hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                    onClick={() => navigate(`/faculty-stats/${faculty.id}`)}
                  >
                    {faculty.name}
                  </span>
                  <span className="font-mono text-base">{faculty.totalAchievements}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      {/* Animations */}
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

export default TopPerformer;
