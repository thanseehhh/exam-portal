import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ExamPage() {
  const { id } = useParams();  // Get exam ID from URL parameters
  const history = useHistory();
  
  // Simulating an exam with questions and options (Replace this with real data from API)
  const examData = {
    id,
    name: 'Math Exam',
    duration: 60, // 60 minutes
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['1', '2', '3', '4'],
        answer: '4',
      },
      {
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        answer: '8',
      },
      {
        question: 'What is 10 - 4?',
        options: ['5', '6', '7', '8'],
        answer: '6',
      },
    ],
  };

  const [timeLeft, setTimeLeft] = useState(examData.duration * 60); // time in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(examData.questions.length).fill(''));
  const [isExamFinished, setIsExamFinished] = useState(false);

  // Countdown Timer Logic
  useEffect(() => {
    if (isExamFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [isExamFinished]);

  // Handle answering questions
  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    setIsExamFinished(true);
    let score = 0;

    // Calculate score
    examData.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score++;
      }
    });

    // Store the score (this could be sent to the backend for saving)
    localStorage.setItem('examResults', JSON.stringify({ examId: id, score, totalQuestions: examData.questions.length }));
    history.push('/student-dashboard'); // Redirect back to the student dashboard
  };

  // Convert time left in seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="exam-page">
      <h2>{examData.name}</h2>
      <p>Time Left: {formatTime(timeLeft)}</p>

      {isExamFinished ? (
        <div>
          <h3>Exam Finished</h3>
          <p>Your Score: {answers.filter((answer, index) => answer === examData.questions[index].answer).length} / {examData.questions.length}</p>
          <button onClick={() => history.push('/student-dashboard')}>Go to Dashboard</button>
        </div>
      ) : (
        <div>
          <h3>Question {currentQuestionIndex + 1} of {examData.questions.length}</h3>
          <p>{examData.questions[currentQuestionIndex].question}</p>

          {examData.questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={handleAnswerChange}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}

          <div>
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestionIndex === examData.questions.length - 1}>
              Next Question
            </button>
            <button onClick={handleSubmitExam} style={{ marginLeft: '10px' }}>
              Submit Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamPage;
