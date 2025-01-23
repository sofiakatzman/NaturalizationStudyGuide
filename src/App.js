import { useState, useEffect } from 'react'
import './App.css'
import questionsData from "./data/DATA"
import Card from './Card'

function App() {
  const [answered, setAnswered] = useState([])
  const [correct, setCorrect] = useState([])
  const [wrong, setWrong] = useState([])
  const [index, setIndex] = useState(getRandomInt())
  const [mode, setMode] = useState("study")

  if(mode == "study"){
    document.body.style.backgroundColor = '#B2CDC9';
  }

  if(mode == "quiz"){
    document.body.style.backgroundColor = '#D0CAF4';
  }

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
    setAnswered([])
    setCorrect([])
    setWrong([])
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
        <div>
          <h3>Answered: </h3>
          <h3>{answered.length}</h3>
        </div>
        <div>
          <h3>Correct:</h3>
          <h3>{correct.length}</h3>
        </div>

        <div>
          <h3>Incorrect:</h3>
          <h3>{wrong.length}</h3>
        </div>
        <div>
          <h3>Remaining: </h3>
          <h3>{questionsData.length - answered.length}</h3>
        </div>
      </div>

        <Card data={questionsData[index]}
              markCorrect={markCorrect}
              markWrong={markWrong}
        />

        
        {/* mode  */}
        <div className="mode">
            <button onClick={switchMode}>switch to {mode === "study" ? "quiz" : "study"} mode</button>
            <h4>{mode} mode</h4>
        </div>
    </div>
  )

}

export default App;

