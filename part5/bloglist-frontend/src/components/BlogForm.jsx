
const BlogForm = ({ 
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newTitle,
    newAuthor,
    newUrl,
 }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
              title
              <input
                type="text"
                value={newTitle}
                name="Title"
                onChange={handleTitleChange}
              />
            </div>
            <div>
              author
              <input
                type="text"
                value={newAuthor}
                name="Author"
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={newUrl}
                name="Url"
                onChange={handleUrlChange}
              />
            </div>
            <button type="submit">create</button>{" "}
          </form>
    )
 }

export default BlogForm