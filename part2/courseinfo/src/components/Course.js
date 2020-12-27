import React from 'react';

const Course = ({ course }) => {      
    return (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total course={course} />
        </div>    
    )
}

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ course }) => {
    console.log('course is', course)
    let total = course.parts.reduce((sum, n) => {
        return sum + n.exercises
    }, 0)
    
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => <Part key={part.id} part={part} />)}
      </div>
    )
  }

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}

export default Course