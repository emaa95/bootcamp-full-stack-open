import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    voteBlog(state, action) {
      const id = action.payload.id

      const blogToChange = action.payload

      return state.map((blog) => (blog.id !== id ? blog : blogToChange))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addComment(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: action.payload.comments,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
  },
})

export const { voteBlog, removeBlog, setBlogs, appendBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(voteBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      dispatch(addComment({ id, comments: updatedBlog.comments }))
      dispatch(showNotification('Comment added successfully', 'success', 5))
    } catch (error) {
      dispatch(showNotification(`Cannot update blog ${id}`, 'error', 5))
    }
  }
}

export default blogSlice.reducer
