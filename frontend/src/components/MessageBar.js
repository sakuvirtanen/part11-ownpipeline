const MessageBar = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`messagebar-${message.type}`}>
        {message.content}
      </div>
    )
  }

  export default MessageBar