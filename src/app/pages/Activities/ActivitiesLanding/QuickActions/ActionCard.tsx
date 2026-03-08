import { Link } from 'react-router-dom'
import s from './styles.module.css'

function ActionCard({ icon, title, subtitle, path, setShowModal}: ActionCardProps) {
  function handleModal() {
    if (!setShowModal) return
    setShowModal(prev => !prev);
  }

  if (path) return (
    <Link to={path} className={s.actionCard}>
      <i className={icon}></i>
      <div className={s.right}>
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
    </Link >
  )

return <button className={s.actionCard} onClick={() => { handleModal() }}>
  <i className={icon}></i>
  <div className={s.right}>
    <h2>{title}</h2>
    <span>{subtitle}</span>
  </div>
</button>
}

export default ActionCard