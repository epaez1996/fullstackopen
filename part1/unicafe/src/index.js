import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.name}</h1>

const Button = ( {name, handleClick} ) => (
  <button onClick ={handleClick}>{name}</button>
)

const Statistics = ( {good, neutral, bad, all, avg, positive} ) => {
  if(all === 0) {
    return (
      <p>no feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ( {text, value} ) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
      
  } 

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const count = good + bad + neutral
  const totalScore = good - bad
  const avg = totalScore / count
  const positive = (good / count) * 100
  const handleGoodButton = () => {
    setGood(good + 1)
  }

  const handleNeutralButton = () => {
    setNeutral(neutral + 1)
  }

  const handleBadButton = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name={'give feedback'} />
      <Button name={'good'} handleClick={handleGoodButton} />
      <Button name={'neutral'} handleClick={handleNeutralButton} />
      <Button name={'bad'} handleClick={handleBadButton} />
      <Header name={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} all={count} avg={avg} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)