import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders title and author', () => {
  const blog = {
    id: '1',
    title: 'test6',
    author: 'ema',
    url: 'http://testurl.com',
    likes: 0,
  }

  const addLike = vi.fn(() => Promise.resolve()) // Simulamos una función que retorna una promesa
  const deleteBlog = vi.fn(() => Promise.resolve())

  render(<Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />)

  const elementTitle = screen.getByText('test6')
  expect(elementTitle).toBeInTheDocument()

  // Verificar que el autor no está presente utilizando queryByText
  const authorElement = screen.queryByText('ema')
  expect(authorElement).not.toBeInTheDocument()

  const urlElement = screen.queryByText('http://testurl.com')
  expect(urlElement).not.toBeInTheDocument()

  const likesElement = screen.queryByText('0')
  expect(likesElement).not.toBeInTheDocument()
})

test('clicking the button shows the blog details', async () => {
  const blog = {
    id: '1',
    title: 'test6',
    author: 'ema',
    url: 'http://testurl.com',
    likes: 0,
  }

  const addLike = vi.fn(() => Promise.resolve())
  const deleteBlog = vi.fn(() => Promise.resolve())

  render(<Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const authorElement = screen.queryByText('ema')
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText('http://testurl.com')
  expect(urlElement).toBeInTheDocument()

  const likesElement = screen.queryByText('0')
  expect(likesElement).toBeInTheDocument()
})

test('calls the event handler twice when the like button is clicked twice', async () => {
  let component
  const blog = {
    id: '1',
    title: 'test6',
    author: 'ema',
    url: 'http://testurl.com',
    likes: 0,
  }

  const addLike = vi.fn()
  const deleteBlog = vi.fn(() => Promise.resolve())

  component = render(
    <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
  )

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByTestId('like-button')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLike).toHaveBeenCalledTimes(2)
})
