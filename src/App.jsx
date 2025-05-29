import { useState } from 'react'
import SimpleQuizApp from './component/Quiz.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1>JTH QUIZ </h1>
        <SimpleQuizApp />
      </div>
      <footer className="footer">
        <p>© 2023 Quiz App. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
