import { useNavigate } from 'react-router-dom';

const AddFaculty = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add Faculty</h2>
        <p className="mb-4">Faculty addition form goes here.</p>
        <button onClick={() => navigate('/home')} className="bg-primary text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );
};

export default AddFaculty;
