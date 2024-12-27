import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [exams, setExams] = useState([]);
  const [newExamName, setNewExamName] = useState('');
  const [newExamDuration, setNewExamDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simulate fetching exams from an API
    const fetchedExams = [
      { id: 1, name: 'Math Exam', duration: 60 },
      { id: 2, name: 'Science Exam', duration: 90 },
    ];
    setExams(fetchedExams); // In real-world, you would make an API call here
  }, []);

  // Handle the creation of a new exam
  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!newExamName || !newExamDuration) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newExam = {
      id: exams.length + 1,
      name: newExamName,
      duration: parseInt(newExamDuration),
    };

    setExams([...exams, newExam]);
    setNewExamName('');
    setNewExamDuration('');
    setErrorMessage('');
  };

  // Handle deletion of an exam
  const handleDeleteExam = (examId) => {
    const updatedExams = exams.filter((exam) => exam.id !== examId);
    setExams(updatedExams);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Create New Exam</h3>
      <form onSubmit={handleCreateExam}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Exam Name"
          value={newExamName}
          onChange={(e) => setNewExamName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newExamDuration}
          onChange={(e) => setNewExamDuration(e.target.value)}
        />
        <button type="submit">Create Exam</button>
      </form>

      <h3>Exams List</h3>
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id}>
              <Link to={`/exam/${exam.id}`}>
                {exam.name} - {exam.duration} min
              </Link>
              <button onClick={() => handleDeleteExam(exam.id)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
