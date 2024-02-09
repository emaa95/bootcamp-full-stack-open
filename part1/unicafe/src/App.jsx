import { useState } from 'react'

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

  const all = () => {
    const total =  good + neutral + bad
    return total
  }
  
  const average = () => {
    const subTotal = good - bad
    const total = all()
    const avg = subTotal / total 

    return total === 0 ? 0 : avg 
  }

  const positive = () => {
    const total = all()
    const positive = good
    const avgPositive = (positive / total) * 100  

    return positive === 0 ? 0 : avgPositive
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={incrementGood}>good</button>
        <button onClick={incrementNeutral}>neutral</button>
        <button onClick={incrementBad}>bad</button>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all()}</p>
        <p>average {average()}</p>
        <p>positive {positive()} %</p>
      </div>
    </div>
  )
}

export default App
