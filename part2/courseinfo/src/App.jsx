const Course = ({course}) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const Header = ({course}) => {
  return (
      <div>
          <h1>{course.name}</h1>
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
