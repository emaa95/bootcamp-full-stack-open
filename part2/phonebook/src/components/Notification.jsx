const Notification = ({ error, success }) => {
    
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        font_size: 20,
        border_style: 'solid',
        border_radius: 5,
        padding: 10,
        margin_bottom: 10
    }
      
    const errorStyle = {
          
        color: 'red',
        background: 'lightgrey',
        font_size: 20,
        border_style: 'solid',
        border_radius: 5,
        padding: 10,
        margin_bottom: 10
        
    }

    if (error) {
        return (
            <div className="error" style={errorStyle}>
                {error}
            </div>
        );
    }
        
    if (success) {
        return (
            <div className="success" style={successStyle}>
                {success}
            </div>
        );
    }
        
        return null;
}

export default Notification