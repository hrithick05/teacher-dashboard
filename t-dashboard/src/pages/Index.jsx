import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import StatCard from '../components/StatCard';
import FacultyTable from '../components/FacultyTable';
import TargetTable from '../components/TargetTable';
import LoginForm from '../components/LoginForm';
import FacultyDetailView from '../components/FacultyDetailView';
import { mockFacultyData } from '../data/mockFaculty';
import { useToast } from '@/hooks/use-toast';

const Index = ({ theme, toggleTheme }) => {
  // Ensure Target row is always at the top
  const initialFacultyData = [
    ...mockFacultyData.filter(f => f.id === 'TARGET'),
    ...mockFacultyData.filter(f => f.id !== 'TARGET')
  ];
  const [facultyData, setFacultyData] = useState(initialFacultyData);
  // Separate target and non-target data
  const targetRow = facultyData.find(f => f.id === 'TARGET');
  const nonTargetFaculty = facultyData.filter(f => f.id !== 'TARGET');
  const [loggedInFaculty, setLoggedInFaculty] = useState(() => {
    const stored = localStorage.getItem('loggedInFaculty');
    return stored ? JSON.parse(stored) : null;
  });
  const { toast } = useToast();

  // Calculate summary statistics
  const totalFaculty = facultyData.length;
  const totalPublications = facultyData.reduce((sum, faculty) => 
    sum + faculty.journalPublications + faculty.bookPublications, 0);
  const totalPatents = facultyData.reduce((sum, faculty) => sum + faculty.patents, 0);
  const totalProjects = facultyData.reduce((sum, faculty) => 
    sum + faculty.studentProjects + faculty.industryCollabs, 0);
  const totalAchievements = facultyData.reduce((sum, faculty) => 
    sum + faculty.rdProposals + faculty.journalPublications + faculty.patents + 
    faculty.studentProjects + faculty.industryCollabs + faculty.otherActivities, 0);

  const handleUpdateAchievement = (updatedFaculty) => {
    setFacultyData(prev => 
      prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f)
    );
    setLoggedInFaculty(updatedFaculty);
  };

  const handleEditFaculty = (faculty) => {
    toast({
      title: "Edit Faculty",
      description: `Opening edit form for ${faculty.name}`,
    });
  };

  const handleViewDetails = (faculty) => {
    setLoggedInFaculty(faculty);
    toast({
      title: "Faculty Details",
      description: `Viewing detailed achievements for ${faculty.name}`,
    });
  };

  const handleAddFaculty = () => {
    toast({
      title: "Add Faculty",
      description: "Opening form to add new faculty member",
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-lg p-6 shadow-elevated dark:from-gray-800 dark:to-gray-700 dark:text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold dark:text-white">Computer Science Department</h1>
                  <p className="text-primary-foreground/80 dark:text-white">Faculty Achievement Dashboard</p>
                </div>
              </div>
              <div className="flex gap-2">
                {loggedInFaculty ? (
                  <button
                    onClick={() => navigate('/details')}
                    className="bg-white/20 border border-white/30 text-primary-foreground px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600"
                  >
                    <Users className="w-4 h-4" />
                    View My Details
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-white/20 border border-white/30 text-primary-foreground px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600"
                  >
                    <Users className="w-4 h-4" />
                    Faculty Login
                  </button>
                )}
                <button
                  onClick={() => navigate('/top-performer')}
                  className="bg-blue-600 border border-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 dark:bg-blue-500 dark:border-blue-600 dark:hover:bg-blue-600"
                >
                  <Award className="w-4 h-4" />
                  View Top Scorer
                </button>
                <button
                  onClick={toggleTheme}
                  className="bg-white/20 border border-white/30 text-primary-foreground px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold dark:text-white">{totalFaculty}</div>
                <div className="text-primary-foreground/80 text-sm dark:text-white">Total Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold dark:text-white">{totalAchievements.toLocaleString()}</div>
                <div className="text-primary-foreground/80 text-sm dark:text-white">Total Achievements</div>
              </div>
            </div>
          </div>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="CSE Faculty"
              value={totalFaculty}
              icon={<Users className="w-5 h-5" />}
              trend="+2 this semester"
              color="primary"
            />
            <StatCard
              title="Publications"
              value={totalPublications}
              icon={<BookOpen className="w-5 h-5" />}
              trend="+15% from last year"
              color="success"
            />
            <StatCard
              title="Patents Filed"
              value={totalPatents}
              icon={<Award className="w-5 h-5" />}
              trend="+8 this quarter"
              color="secondary"
            />
            <StatCard
              title="Active Projects"
              value={totalProjects}
              icon={<TrendingUp className="w-5 h-5" />}
              trend="+12% growth"
              color="primary"
            />
          </div>
          {/* Target Table (right after search bar/filters) */}
          <TargetTable target={targetRow} />
          {/* Faculty Table */}
          <FacultyTable
            facultyData={nonTargetFaculty}
            onEditFaculty={handleEditFaculty}
            onViewDetails={handleViewDetails}
            onAddFaculty={handleAddFaculty}
          />
        </div>
      </div>
    </>
  );
};

export default Index;