import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
    
    const total = props.good + props.neutral + props.bad
    const subAvg = props.good - props.bad
    const avg = total === 0 ? 0 : (subAvg / total).toFixed(1); 
    const avgPositive = total === 0 ? 0 : ((props.good / total) * 100).toFixed(1);

    if (total === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
    <div>
        <h2>statistics</h2>
        <table>
        <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="nuetral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={`${avgPositive} %`}/>
        </tbody>
        </table>
      </div>
    )
}

export default Statistics