import { Link } from 'react-router-dom'
import s from './styles.module.css'
import { useEffect } from 'react';

function ActionCard({ icon, title, subtitle, path, setShowModal, showModal }: ActionCardProps) {
  function handleModal() {
    if (!setShowModal) return
    setShowModal(prev => !prev);
  }


  useEffect(() => {
    console.log(showModal)
  }, [showModal])

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