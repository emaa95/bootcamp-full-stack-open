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
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    dispatch(createBlog(newBlog))
    dispatch(
      showNotification(
        `${newBlog.title} was created successfully`,
        'success',
        5
      )
    )
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div className="div-principal2">
      <form onSubmit={addBlog} className="form-add">
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-username"
            sx={{ color: 'white' }}
            data-testid="title"
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
            name="title"
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-author"
            sx={{ color: 'white' }}
            data-testid="author"
          >
            Author
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-author"
            endAdornment={
              <InputAdornment position="end">
                <Icon sx={{ color: 'white' }}>
                  <img src={author} alt="author" />
                </Icon>
              </InputAdornment>
            }
            label="Author"
            name="author"
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '15px' }}>
          <InputLabel
            htmlFor="outlined-adornment-url"
            sx={{ color: 'white' }}
            data-testid="url"
          >
            URL
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-url"
            endAdornment={
              <InputAdornment position="end">
                <Icon sx={{ color: 'white' }}>
                  <img src={url} alt="url" />
                </Icon>
              </InputAdornment>
            }
            label="URL"
            name="url"
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ fontSize: '20px', backgroundColor: '#5b95d6' }}
        >
          +
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
