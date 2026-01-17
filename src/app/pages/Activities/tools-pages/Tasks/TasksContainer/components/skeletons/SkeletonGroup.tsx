import SkeletonTask from "./SkeletonTask"
import s from "./styles.module.css"
function SkeletonGroup({
    style
}: {style: string}) {

  console.log("hello")
  return (
    <div className={`${s.skeletonGroup} ${style}`}>
        {Array.from({length: 5}).map(() => {
          return <SkeletonTask />
        })}
    </div>
  )
}

export default SkeletonGroup