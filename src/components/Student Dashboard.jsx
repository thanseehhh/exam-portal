// import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// function StudentDashboard() {
//   const [exams, setExams] = useState([]);
//   const [examHistory, setExamHistory] = useState([]);
//   const history = useHistory();

//   useEffect(() => {
//     // Simulate fetching exams available for the student
//     const fetchedExams = [
//       { id: 1, name: 'Math Exam', duration: 60 },
//       { id: 2, name: 'Science Exam', duration: 90 },
//       { id: 3, name: 'History Exam', duration: 45 },
//     ];
//     setExams(fetchedExams); // Simulated fetch
//   }, []);

//   useEffect(() => {
//     // Simulate fetching past exam history
//     const fetchedHistory = [
//       { id: 1, name: 'Math Exam', score: 85 },
//       { id: 2, name: 'Science Exam', score: 90 },
//     ];
//     setExamHistory(fetchedHistory); // Simulated fetch
//   }, []);

//   const handleStartExam = (examId) => {
//     // Navigate to the exam page (the student can start the exam here)
//     history.push(`/exam/${examId}`);
//   };

//   return (
//     <div className="student-dashboard">
//       <h2>Welcome, Student</h2>

//       <h3>Available Exams</h3>
//       {exams.length === 0 ? (
//         <p>No exams available at the moment.</p>
//       ) : (
//         <ul>
//           {exams.map((exam) => (
//             <li key={exam.id}>
//               <Link to={`/exam/${exam.id}`}>
//                 {exam.name} - {exam.duration} min
//               </Link>
//               <button onClick={() => handleStartExam(exam.id)} style={{ marginLeft: '10px' }}>
//                 Start Exam
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3>Exam History</h3>
//       {examHistory.length === 0 ? (
//         <p>You have not taken any exams yet.</p>
//       ) : (
//         <ul>
//           {examHistory.map((exam) => (
//             <li key={exam.id}>
//               {exam.name} - Score: {exam.score}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default StudentDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [examResults, setExamResults] = useState(null);

  useEffect(() => {
    // Fetch exam results from local storage or API
    const results = JSON.parse(localStorage.getItem('examResults'));
    if (results) {
      setExamResults(results);
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic here, such as clearing authentication
    localStorage.removeItem('examResults');
    navigate('/login'); // Navigate to login page
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {examResults ? (
        <div>
          <h3>Exam Results</h3>
          <p>Exam ID: {examResults.examId}</p>
          <p>Score: {examResults.score} / {examResults.totalQuestions}</p>
        </div>
      ) : (
        <p>No exam results available.</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;

