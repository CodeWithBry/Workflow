import s from '../styles.module.css';

function Thinking({
    isThinking
}: {
    isThinking: boolean
}) {
    return (
        <div className={`${s.thinking} ${!isThinking && s.hide}`}>
            <div className={s.tdot}></div>
            <div className={s.tdot}></div>
            <div className={s.tdot}></div>
        </div>
    )
}

export default Thinking