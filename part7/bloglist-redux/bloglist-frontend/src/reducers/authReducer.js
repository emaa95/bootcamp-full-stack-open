import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    initUser(state, action) {
      return action.payload
    },
    loginUser(state, action) {
      return action.payload
    },
    logoutUser() {
      return null
    },
  },
})

export const { initUser, loginUser, logoutUser } = authSlice.actions

export const initialUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
    } catch (exception) {
      dispatch(showNotification('Wrong credentials...', 'error', 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }
}

export default authSlice.reducer
