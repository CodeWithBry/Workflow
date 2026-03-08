import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../../../../context/AppContext";

function Cards() {
    const { darkMode, analytics } = useContext(context) as Context;
    const cards: CardComponent[] = [
        {
            icon: "fa-solid fa-bullseye",
            number: analytics.allTask.length,
            title: "Total Tasks"
        },
        {
            icon: "far fa-check-circle",
            number: analytics.allTask.filter(task => task.status == "finished").length,
            title: "Finished Tasks"
        },
        {
            icon: "fas fa-hourglass-half",
            number: analytics.allTask.filter(task => task.status == "pending").length,
            title: "Pending Tasks"
        },
        {
            icon: "fas fa-robot",
            number: 25,
            title: "AI Message Requests"
        }
    ]

    return (
        <div className={`${s.cards} ${darkMode && s.dark}`}>
            {cards.map((card) => {
                return <div className={s.card} key={crypto.randomUUID()}>
                    <div className={s.top}>
                        <i className={card.icon} role="img"></i>

                        {/* <p>1 month ago</p> */}
                    </div>
                    <div className={s.bottom}>
                        <h3>{card.number}</h3>
                        <p>{card.title}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Cards