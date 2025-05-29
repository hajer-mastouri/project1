import { useEffect, useState } from "react";
import { questions as allQuestions } from "./questions";
import { AnimatePresence, motion } from "framer-motion";

const Quiz = ({ darkMode, category, difficulty }) => {
  const filteredQuestions = allQuestions.filter(
    q =>
      (category === "All" || q.category === category) &&
      (difficulty === "All" || q.difficulty === difficulty)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("quizHighScore")) || 0);
  

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    

    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const playSound = (src) => {
    const sound = new Audio(src);
    sound.play();
  };

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);

    if (option === filteredQuestions[currentQuestion].answer) {
      playSound("/Congratulations_BBC_Sound_Effect_into_Cheer_Into_Applause_Inclusion.mp3");
      setScore(prev => prev + 1);
    } else {
      playSound("/Fail Sound Effect.mp3");
    }

    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    const next = currentQuestion + 1;
    if (next < filteredQuestions.length) {
      setCurrentQuestion(next);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      const finalScore = score + (selectedOption === filteredQuestions[currentQuestion].answer ? 1 : 0);
      if (finalScore > highScore) {
        localStorage.setItem("quizHighScore", finalScore);
        setHighScore(finalScore);
      }
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
    setTimeLeft(15);
  };

  const cardClass = `card ${darkMode ? "bg-secondary text-light" : ""}`;

  return (
    <AnimatePresence mode="wait">
      {showScore ? (
        <motion.div
          key="score"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={cardClass}
        >
          <div className="card-body text-center">
            <h4 className="card-title mb-3">Quiz Completed!</h4>
            <p>Your Score: {score} / {filteredQuestions.length}</p>
            <p>High Score: {highScore}</p>
            <button className="btn btn-primary mt-3" onClick={handleRestart}>Restart Quiz</button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.3 }}
          className={cardClass}
        >
          <div className="card-body">
           <div className="mb-2">
  <div className="d-flex justify-content-between">
    <span>Question {currentQuestion + 1} / {filteredQuestions.length}</span>
    <span className="text-danger fw-bold">Time: {timeLeft}s</span>
  </div>
  <div 
    className="progress" 
    style={{height: "6px", marginTop: "4px", borderRadius: "4px", overflow: "hidden"}}
  >
    <div
      className={`progress-bar ${darkMode ? "bg-info" : "bg-primary"}`}
      role="progressbar"
      style={{
        width: `${(timeLeft / 15) * 100}%`,
        transition: "width 1s linear"
      }}
      aria-valuenow={timeLeft}
      aria-valuemin="0"
      aria-valuemax="15"
    />
  </div>
</div>

            <h5 className="card-title">{filteredQuestions[currentQuestion].question}</h5>
            <div className="list-group mt-3">
              {filteredQuestions[currentQuestion].options.map((option, idx) => {
                let className = "list-group-item list-group-item-action";
                if (selectedOption !== null) {
                  if (option === filteredQuestions[currentQuestion].answer) {
                    className += " list-group-item-success";
                  } else if (option === selectedOption) {
                    className += " list-group-item-danger";
                  } else {
                    className += " disabled";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className={className}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Quiz;
