import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async disptach => {
    const anecdotes = await anecdoteService.getAll()
    disptach(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer

