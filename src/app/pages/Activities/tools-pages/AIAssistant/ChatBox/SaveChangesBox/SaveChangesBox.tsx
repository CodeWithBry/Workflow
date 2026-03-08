import { useContext } from "react";
import Button from "../../../../../../../components/ui/Button";
import { context } from "../../../../../../context/AppContext";
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
import s from "./styles.module.css"
import { updateAnalyticsData } from "../../../Tasks/TasksContainer/utils/updateAnalyticsData";

function SaveChangesBox({ showSaveProject, setShowSaveProject, projectObject }: SaveChangesProps) {
    const { darkMode, userInfo, setSelectedTaskClass, setAnalytics, setWeekData } = useContext(context) as Context;

    return (
        <div className={`${s.bgWrapper} ${!showSaveProject && s.hide} ${darkMode && s.dark}`}>
            <div className={s.form}>
                <Button
                    iconElement={<i className="fa fa-close"></i>}
                    className={s.cancel}
                    clickListener={() => setShowSaveProject(false)} />
                <h1>Save Using This New Project Data?</h1>
                <p>You will overwrite your previous project data with this new project data.</p>
                <Button
                    className={`${s.actionButton} ${s.staySignedIn}`}
                    clickListener={async () => {
                        if (userInfo && projectObject) {
                            const dateUpdated = Date.now();
                            setSelectedTaskClass({ ...projectObject });
                            await updateAnalyticsData({
                                updatedGroup: projectObject.taskGroups,
                                project: projectObject,
                                dateUpdated,
                                userId: userInfo.userId,
                                setAnalytics,
                                setWeekData
                            })
                            await saveProjectFromFirestore(userInfo?.userId, projectObject, undefined, "update");
                            setShowSaveProject(false);
                        }
                    }}
                    content={"Overwrite My Project"} />
                <Button
                    className={`${s.actionButton} ${s.signOut}`}
                    clickListener={() => setShowSaveProject(false)}
                    content={"Decline"} />
            </div>
        </div>
    )
}

export default SaveChangesBox;