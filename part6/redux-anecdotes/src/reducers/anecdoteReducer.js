import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action){
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ).sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async disptach => {
    const anecdotes = await anecdoteService.getAll()
    disptach(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async disptach => {
    const newAnecdote = await anecdoteService.createNew(content)
    disptach(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToChange = state.anecdotes.find(a => a.id === id);
    const updatedAnecdote = await anecdoteService.update(id, anecdoteToChange);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer

