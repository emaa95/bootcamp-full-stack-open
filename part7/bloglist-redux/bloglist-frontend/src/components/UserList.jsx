import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h2>Users</h2>
      <th></th>
      <th>blogs created</th>
      {users.map((user) => (
        <tr key={user.id}>
          <td>
            <Link to={`/users/${user.id}`}>{user.name} </Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </div>
  )
}

export default UserList
