import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <div style={{display:"flex"}}>
      <Button handleClick={incrementGood} text="good"/>
      <Button handleClick={incrementNeutral} text="neutral"/>
      <Button handleClick={incrementBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
