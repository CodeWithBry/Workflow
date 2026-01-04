import s from '../styles.module.css'
import Button from '../../../../../../../../components/ui/Button';

function Suggestion() {
    return (
        <div className={s.suggestionsContainer}>
            <div className={s.greetings}>
                <span>Hello, Bryan</span>
                <h2>How can I help you?</h2>
            </div>
            <img src="./Ai-Assistant/sparkle-blue.png" alt="blue-sparkle" />
            <Button
                className={s.suggestionButton}
                clickListener={() => { }}
                content={"Can you help me with this project?"} />
            <Button
                className={s.suggestionButton}
                clickListener={() => { }}
                content={"How do I finished this task?"} />
            <Button
                className={s.suggestionButton}
                clickListener={() => { }}
                content={"Give me the progress of this project."} />
        </div>
    )
}

export default Suggestion