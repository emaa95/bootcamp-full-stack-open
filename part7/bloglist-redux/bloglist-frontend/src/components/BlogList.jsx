import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import './BlogList.css'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const columns = [
    {
      field: 'title',
      headerName: 'BLOGS',
      width: 300,
      renderCell: (params) => (
        <Link to={`/blogs/${params.row.id}`} className="link">
          {' '}
          {params.value}
        </Link>
      ),
    },
  ]
  const rows = blogs.map((blog, index) => ({
    id: blog.id || index,
    title: blog.title,
  }))

  return (
    <div
      className="container"
      style={{ height: 400, width: '90%', marginTop: '15px' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: 'white',
          },
        }}
      />
    </div>
  )
}

export default BlogList
