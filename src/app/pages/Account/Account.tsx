import { useContext, useState } from "react";
import s from "./styles.module.css";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import ChangePassword from "./modals/ChangePassword/ChangePassword";
import DeleteAccount from "./modals/DeleteAccountConfirmation/DeleteAccountConfirmation";
import { context } from "../../context/AppContext";
function Account() {
    const { darkMode } = useContext(context) as Context;
    const [showChangePass, setShowChangePass] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    return (
        <div className={`${s.account} ${darkMode && s.dark}`}>
            <DeleteAccount showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <ChangePassword showChangePass={showChangePass} setShowChangePass={setShowChangePass}/>
            <div className={s.wrapper}>
                <Header />
                <Content 
                    setShowChangePass={setShowChangePass} 
                    setShowDeleteModal={setShowDeleteModal}/>
                <Footer />
            </div>
        </div>
    )
}

export default Account