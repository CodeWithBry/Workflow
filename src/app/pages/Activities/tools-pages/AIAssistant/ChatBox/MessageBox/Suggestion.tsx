import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../context/AppContext';
import Button from '../../../../../../../components/ui/Button';

function Suggestion() {
    const { darkMode } = useContext(context) as Context;
    const suggestionStyles = !darkMode ? s.suggestion : `${s.suggestion} ${s.dark}`
    return (
        <div className={suggestionStyles}>
            <div className={s.greetings}>
                <span>Hello, Bryan</span>
                <h2>How can I help you?</h2>
            </div>

            <div className={s.suggestionsContainer}>
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
        </div>
    )
}

export default Suggestion