import './Notification.css'

const Notification = ({ error, success }) => {
    

    if (error === null && success === null) {
      return null
    }
    
    if (error) {
        return (
            <div className="error">
              {error}
            </div>
        )
    } else {
        return (
            <div className="succes">
              {success}
            </div>
          )
    }
    
  }
  
  export default Notification