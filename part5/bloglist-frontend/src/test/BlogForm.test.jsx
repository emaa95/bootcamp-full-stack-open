import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)
  const submitButton = screen.getByRole('button', { name: /\+/i })

  await user.type(titleInput, 'test1')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'www.test1.com')
  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'test1',
    author: 'author',
    url: 'www.test1.com',
  })
})
