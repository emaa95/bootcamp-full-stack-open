import './Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ error, success }) => {
  if (error === null && success === null) {
    return null
  }

  if (error) {
    return <div className="error">{error}</div>
  } else {
    return <div className="succes">{success}</div>
  }
}

Notification.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
}

export default Notification
