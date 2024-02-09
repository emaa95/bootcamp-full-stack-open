
const Header = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    )
  }
  
const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map(part => <Part key={part.id} part={part}></Part>)
            }
        </div>
    )
  }
  
const Part = ({part}) => {
    return(
        <div>
            {part.name} {part.exercises}
        </div>
    )
  }
  
const Total = ({parts}) => {
    return (
        <div>
            <p>
                <strong>total of {parts.reduce((total, part) => total + part.exercises, 0 )} exercises </strong>
            </p>
        </div>
    )
  }

const Course = ({course}) => {
    return (
      <div>
        <Header course={course}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </div>
    )
  }

export default Course