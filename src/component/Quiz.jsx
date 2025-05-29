import React, { useState } from 'react';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answerIndex: 2,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answerIndex: 1,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    answerIndex: 0,
  },
];

export default function SimpleQuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (index) => {
    setSelectedAnswerIndex(index);
  };

  const handleNextClick = () => {
    if (selectedAnswerIndex === currentQuestion.answerIndex) {
      setScore(prev => prev + 1);
    }
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Simple Quiz App</h1>
      {showScore ? (
        <div style={styles.scoreSection}>
          <h2>Your Score: {score} / {quizData.length}</h2>
          <button style={styles.restartButton} onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div style={styles.questionSection}>
            <div style={styles.questionCount}>
              Question {currentQuestionIndex + 1} / {quizData.length}
            </div>
            <div style={styles.questionText}>{currentQuestion.question}</div>
          </div>
          <div style={styles.answerSection}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                  ...styles.answerButton,
                  ...(selectedAnswerIndex === index ? styles.selectedAnswerButton : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            style={{
              ...styles.nextButton,
              ...(selectedAnswerIndex === null ? styles.nextButtonDisabled : {}),
            }}
            onClick={handleNextClick}
            disabled={selectedAnswerIndex === null}
          >
            {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '50px auto',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  questionSection: {
    marginBottom: 20,
  },
  questionCount: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  answerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  answerButton: {
    padding: '12px 20px',
    fontSize: 16,
    borderRadius: 8,
    border: '2px solid #ddd',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  selectedAnswerButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
  },
  nextButton: {
    padding: '12px 30px',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#28a745',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  nextButtonDisabled: {
    backgroundColor: '#94d3a2',
    cursor: 'not-allowed',
  },
  scoreSection: {
    textAlign: 'center',
  },
  restartButton: {
    marginTop: 20,
    padding: '10px 40px',
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

