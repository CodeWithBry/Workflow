import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../context/AppContext";
import Button from "../../../../components/ui/Button";
import cancelChanges from "../utils/cancelChanges";
import { saveUserData } from "../../../../lib/firebase";

function Footer() {
  const { darkMode, userInfo, setUserInfo, navigation } = useContext(context) as Context;

  return (
    <div className={`${s.footer} ${darkMode && s.dark}`}>
      <Button
        className={`${s.actionButton} ${s.cancel}`}
        clickListener={async () => {
          if (userInfo) await cancelChanges(userInfo.userId, setUserInfo);
          navigation("/")
        }}
        content={"Cancel"} />
      <Button
        className={`${s.actionButton} ${s.saveChanges}`}
        clickListener={() => {
          if (userInfo) saveUserData(userInfo.userId, userInfo);
        }}
        content={"Save Changes"} />
    </div>
  )
}

export default Footer