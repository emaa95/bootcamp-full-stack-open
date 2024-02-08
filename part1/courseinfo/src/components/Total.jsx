
const Total = ({parts}) => {
    return (
        <div>
            <p>
                Number of exercises {parts.reduce((total, part) => total + part.exercises, 0 )}
            </p>
        </div>
    )
}

export default Total