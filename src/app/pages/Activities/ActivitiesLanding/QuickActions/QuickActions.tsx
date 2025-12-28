import ActionCard from './ActionCard'
import s from './styles.module.css'

function QuickActions(props: QuickActionsProps) {
  const actions = [
    { icon: "	fas fa-plus", title: "Create New Project", subtitle: "Get it done with AI Assistant" },
    { icon: "	fas far fa-list-alt", title: "Everyday Tasks", subtitle: "Monitor your task each day", path: "/activities/everyday-task/tasks" },
    { icon: "	fas fa-calendar-alt", title: "Daily Routine", subtitle: "Get reminded and do daily routine", path: "/activities/daily-routine/tasks" },
    { icon: "	fas fa-calendar-day", title: "Occasional", subtitle: "Prepare from outigns and stuffs", path: "/activities/occasional/tasks" }
  ]

  return (
    <div className={s.quickActions}>
      <p>Quick Actions</p>
      <div className={s.container}>
        {actions.map((act) => {
          return <ActionCard {...{ ...act, ...props }}/>
        })}
      </div>
    </div>
  )
}

export default QuickActions