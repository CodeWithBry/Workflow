import { useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { context } from "../../../../../../context/AppContext";
import Button from "../../../../../../../components/ui/Button";
import { getWeekRange } from "../../../../../../../utils/getWeekRange";
import { getWeek } from "../../../../../../../utils/getWeek";

function Title() {
    const { darkMode, analytics, userInfo, getUrl, setWeekData } = useContext(context) as Context;
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [date, setDate] = useState<string>(getWeekRange());

    useEffect(() => {
        if(analytics) {
            setDate(analytics.weeks[analytics.weeks.length-1])
        }
    }, [analytics])

    return (
        <div className={`${s.title} ${darkMode && s.dark}`}>
            <h2>
                Analytics
                <div className={s.weeksWrapper}>
                    <Button
                        className={s.selectedWeek}
                        clickListener={() => {
                            setShowDropDown(prev => !prev)
                        }}
                        content={<span>{date}</span>}
                        iconElement={<i className={showDropDown ? "fas fa-angle-up" : "fas fa-angle-down"}></i>} />

                    <div className={`${s.dropDown} ${!showDropDown && s.hide}`}>
                        {analytics.weeks.map((week) => {
                            return <Button
                                clickListener={async () => {
                                    if (!userInfo) return;
                                    setShowDropDown(false);
                                    setDate(week);
                                    await getWeek(userInfo.userId, getUrl[2], week, setWeekData);
                                }}
                                className={s.actionButton}
                                content={week} />
                        })}
                    </div>
                </div>
            </h2>
            <p>Track progress, performance, and productivity insights.
            </p>
        </div>
    )
}

export default Title