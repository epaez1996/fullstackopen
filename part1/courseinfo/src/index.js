import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>{props.course_name}</h1>
    </div>
  )
}

const Content = (props) => {
  let [part1, part2, part3] = props.parts;
  return (
    <div>
      <Part part_number={part1.name} number_of_exercises={part1.exercises} />
      <Part part_number={part2.name} number_of_exercises={part2.exercises} />
      <Part part_number={part3.name} number_of_exercises={part3.exercises} />
      
    </div>
  )
}

const Total = (props) => {
  let [part1, part2, part3] = props.parts;
  let sum = part1.exercises = part2.exercises + part3.exercises;

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part_number} {props.number_of_exercises}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      { 
      name: 'Using props to pass data',
      exercises: 7
      }, 
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)