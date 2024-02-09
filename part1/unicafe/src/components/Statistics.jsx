
const Statistics = (props) => {
    
    const total = props.good + props.neutral + props.bad
    const subAvg = props.good - props.bad
    const avg = total === 0 ? 0 : subAvg / total; 
    const avgPositive = total === 0 ? 0 : props.good / total;


    return (
    <div>
        <h2>statistics</h2>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {total}</p>
        <p>average {avg}</p>
        <p>positive {avgPositive} %</p>
      </div>
    )
}

export default Statistics