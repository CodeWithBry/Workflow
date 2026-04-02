import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../../../../context/AppContext";

function DataInterpretation() {
    const { weekData, darkMode } = useContext(context) as Context;

    const cards: CardComponent[] = [
        {
            icon: "fa-solid fa-calendar-day",
            getValue: () => {
                let getFinishTaskLength = 0;
                weekData?.dataSets.forEach((val) => {
                    getFinishTaskLength += val;
                })
                return (getFinishTaskLength / 7).toFixed(2);
            },
            title: "Avg / Day"
        },
        {
            icon: "fa-solid fa-bolt",
            getValue: () => {
                let getFinishTaskLength = 0;
                let numOfActiveDays = 0
                weekData?.dataSets.forEach((val) => {
                    getFinishTaskLength += val;

                    if(val != 0) numOfActiveDays += 1;
                })
                return (getFinishTaskLength / numOfActiveDays).toFixed(2);
            },
            title: "Avg / Active Day"
        },
        {
            icon: "fa-solid fa-calendar-check",
            getValue: () => {
                let numOfActiveDays = 0;
                weekData?.dataSets.forEach((val) => {
                    if(val != 0) numOfActiveDays += 1;
                })
                return `${numOfActiveDays}`;
            },
            title: "Active Days"
        },
        {
            icon: "fa-solid fa-repeat",
            getValue: () => {
                let numOfActiveDays = 0;
                weekData?.dataSets.forEach((val) => {
                    if(val != 0) numOfActiveDays += 1;
                })
                return `${((numOfActiveDays / 7) * 100).toFixed(2)}%`;
            },
            title: "Consistency"
        }
    ]

    return (
        <div className={`${s.dataInt} ${darkMode && s.dark}`}>
            {cards.map((card) => {
                return <div className={s.card} key={crypto.randomUUID()}>
                    <div className={s.top}>
                        <i className={card.icon} role="img"></i>

                        {/* <p>1 month ago</p> */}
                    </div>
                    <div className={s.bottom}>
                        <h3>{card.getValue ? card.getValue() : 0}</h3>
                        <p>{card.title}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default DataInterpretation