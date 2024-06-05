import { useState } from 'react'
import {
  Button,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import TitleIcon from '@mui/icons-material/Title'
import author from '../assets/icons8-writer-male-24-white.png'
import url from '../assets/icons8-url-24.png'
import './BlogForm.css'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="div-principal2">
      <form onSubmit={addBlog} className="form-add">
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-username"
            sx={{ color: 'white' }}
            data-testid='title'
          >
            Title
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            endAdornment={
              <InputAdornment position="end">
                <TitleIcon style={{ color: 'white' }} />
              </InputAdornment>
            }
            label="Title"
            value={newTitle}
            onChange={handleTitleChange}
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-author"
            sx={{ color: 'white' }}
            data-testid='author'
          >
            Author
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-author"
            endAdornment={
              <InputAdornment position="end">
                <Icon sx={{ color: 'white' }}><img src={author} alt="author"/></Icon>
              </InputAdornment>
            }
            label="Author"
            value={newAuthor}
            onChange={handleAuthorChange}
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-url"
            sx={{ color: 'white' }}
            data-testid='url'
          >
            URL
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-url"
            endAdornment={
              <InputAdornment position="end">
                <Icon sx={{ color: 'white' }}><img src={url} alt="url"/></Icon>
              </InputAdornment>
            }
            label="URL"
            value={newUrl}
            onChange={handleUrlChange}
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>

        <Button type="submit" variant='contained' size="large" style={{ fontSize: '20px', backgroundColor:'#5b95d6' }}>+</Button>

      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm