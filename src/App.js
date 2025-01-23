import { useState } from 'react'
import './App.css'
import questionsData from "./data/DATA"
import Card from './Card'

/* -------------------------------------------------------------------

  This is my Naturalization Study Guide!
    ✓ Data Points To Calculate For:
      There are a total of X questions. 
      I have answered X questions. 
      I have gotten X questions correct. 
      I have gotten X questions wrong.
      There are X questions left. 

    * Study Mode -> Asks all 100 Questions
          : When App loads, pick a random question to display. 
            -> User responds to Question: 
              -> Question marked as correct or incorrect
              -> Data points updated
                * load new question 
                  -> start cycle again

    * Quiz Mode -> Only Asks 10 Questions -> Pass at 6 Correct 

  ------------------------------------------------------------------- */

function App() {
  const [answered, setAnswered] = useState([])
  const [correct, setCorrect] = useState([])
  const [wrong, setWrong] = useState([])
  const [index, setIndex] = useState(getRandomInt())
  const [mode, setMode] = useState("study")

  // console.log(questionsData)
  function getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(99);
    let potentialIndex = Math.floor(Math.random() * (max - min + 1)) + min

    // for when there are no questions left
    if (answered.length === max - min + 1) {
      return null
    }

    // check that the number hasn't already been called - return that number if not, call function again if so
    if (!answered.includes(potentialIndex)) {
      return potentialIndex;
    } else {
      return getRandomInt();
    }
  }

  function markCorrect(){
    setCorrect([...correct, index])
    const newIndex = getRandomInt()
    setIndex(newIndex)
    setAnswered([...answered, index])
  }

  function markWrong(){
    setWrong([...wrong, index])
    const newIndex = getRandomInt()
    setIndex(newIndex)
    setAnswered([...answered, index])
  }
  
  function switchMode(){
    mode === "study" ? setMode("quiz") : setMode("study")
  }

  // listen for quiz mode to interject once enough questions are answered
  console.log(correct.length)
  console.log(mode)

  if(answered.length == questionsData.length)return(
    <div>
      <h1>You've answered all the questions!</h1>
    </div>
  )

  if(mode == "quiz" && correct.length == 6)return(
    <div>
      <h1>Well done! You've passed.</h1>
    </div>
  )

  if(mode == "quiz" && answered.length == 10)return(
    <div>
      <h1>Oh no! You failed</h1>
    </div>
  )
  
  if(answered.length < questionsData.length)return(
    <div className="App">
      {/* score */}
      <div className="score">
        <h3>Total Questions: {answered.length}</h3>
        <h3>Correctly Answered: {correct.length}</h3>
        <h3>Incorrectly Answered: {wrong.length}</h3>
        <h3>Questions Left: {questionsData.length - answered.length}</h3>

        {/* mode  */}
        <div className="mode">
          <h4>Mode: {mode}</h4>
          <button onClick={switchMode}>switch</button>
        </div>

        <Card data={questionsData[index]}
              markCorrect={markCorrect}
              markWrong={markWrong}
        />

      </div>
        

    </div>
  )

}

export default App;

