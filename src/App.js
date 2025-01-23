import { useState } from 'react';
import './App.css';

/* -------------------------------------------------------------------

  This is my Naturalization Study Guide!
    * Data Points To Calculate For:
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
  
  if(answered.length < 99)return (
    <div className="App">
      <h1>{index}</h1>

      <button onClick={()=> markCorrect()}>Mark Correct</button>
      <button onClick={()=> markWrong()}>Mark Wrong</button>
      <h1>Total Questions: {answered.length}</h1>
      <h1>Correctly Answered: {correct.length}</h1>
      <h1>Incorrectly Answered: {wrong.length}</h1>
      <h1>Questions Left: {99 - answered.length}</h1>

    </div>
  );

  if(answered.length == 99)return(
    <div>
      <h1>You've answered all the questions!</h1>
    </div>
  )
}

export default App;

