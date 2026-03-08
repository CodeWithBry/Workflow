import s from "../styles.module.css";

function LoadingContainer() {
  return (
    <div className={s.loadingContainer}>
      <div className={s.spinner}></div>
      <span className={s.loadingText}>Loading chats...</span>
    </div>
  )
}

export default LoadingContainer