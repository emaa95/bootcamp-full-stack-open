import './Notification.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  if (notification.type === 'error') {
    return <div className="error">{notification.message}</div>
  } else {
    return <div className="success">{notification.message}</div>
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
  }),
}

export default Notification
