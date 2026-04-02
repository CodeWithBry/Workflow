import { useContext, type Dispatch, type SetStateAction } from "react";
import s from "./styles.module.css";
import { context } from "../../../context/AppContext";
import Button from "../../../../components/ui/Button";
import cancelChanges from "../utils/cancelChanges";
import { saveUserData } from "../../../../lib/firebase";

type Props = {setLoading: Dispatch<SetStateAction<boolean>>}

function Footer({setLoading}: Props) {
  const { darkMode, userInfo, setUserInfo, navigation } = useContext(context) as Context;

  return (
    <div className={`${s.footer} ${darkMode && s.dark}`}>
      <Button
        className={`${s.actionButton} ${s.cancel}`}
        clickListener={async () => {
          if (userInfo) await cancelChanges(userInfo.userId, setUserInfo);
          navigation("/activities")
        }}
        content={"Cancel"} />
      <Button
        className={`${s.actionButton} ${s.saveChanges}`}
        clickListener={async() => {
          setLoading(true);
          if (userInfo) await saveUserData(userInfo.userId, userInfo);
          setLoading(false)
        }}
        content={"Save Changes"} />
    </div>
  )
}

export default Footer