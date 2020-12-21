import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <div>
    <button onClick={props.handleVoteClick}>vote</button>
    <button onClick={props.handleClick}>next anecdote</button>
  </div>
}
 
const Header = (props) => <h1>{props.name}</h1>

const Display = ( {anecdote, numOfVotes} ) => {
  return (
    <div>
    <p>{anecdote}</p>
    <p>has {numOfVotes} votes</p>
  </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

  const handleRandomButton = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  }

  const handleVoteButton = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotedAnecdote = () => {
    let index = 0;
    let max = 0;
    for(let i = 0; i < votes.length; i++) {
      if(votes[i] >= max) {
        max = votes[i];
        index = i;
      }
    }

    return index;
  }
  
  return (
    <div>
      <Header name="Anecdote of the day"/>
      <Display anecdote={props.anecdotes[selected]} numOfVotes={votes[selected]} />
      <Button handleClick={handleRandomButton} handleVoteClick={handleVoteButton}/>
      <Header name="Anecdote with most votes"/>
      <Display anecdote={props.anecdotes[mostVotedAnecdote()]} numOfVotes={Math.max(...votes)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)