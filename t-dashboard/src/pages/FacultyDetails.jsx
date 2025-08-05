import { useParams, useNavigate } from 'react-router-dom';
import FacultyDetailView from '../components/FacultyDetailView';
import { mockFacultyData } from '../data/mockFaculty';

const FacultyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const faculty = mockFacultyData.find(f => f.id === id);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Faculty Not Found</h2>
          <button onClick={() => navigate('/faculty-login')} className="bg-primary text-white px-4 py-2 rounded">Back to Login</button>
        </div>
      </div>
    );
  }

  return <FacultyDetailView faculty={faculty} onLogout={() => navigate('/')} onUpdateAchievement={() => {}} />;
};

export default FacultyDetails;
