import styles from './Message.module.css'

function Message({ title, children, error = false }) {
  return (
    <div className={`${styles.message} ${error ? styles.error : ''}`}>
      <strong>{title}</strong>
      {children && <p>{children}</p>}
    </div>
  )
}

export default Message