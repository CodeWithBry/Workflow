import { type Dispatch, type SetStateAction } from "react";
import s from "./styles.module.css";
import { deleteAccount } from "../../utils/deleteAccount";

function DeleteAccount({ showDeleteModal, setShowDeleteModal }: {
    showDeleteModal: boolean
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>
}) {

    if (!showDeleteModal) return null;

    return (
        <div className={s.overlay} onClick={() => setShowDeleteModal(false)}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.iconContainer}>
                    <i className="fas fa-trash-alt"></i>
                </div>
                <h2 className={s.title}>Delete Account</h2>
                <p className={s.message}>
                    Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
                </p>
                <div className={s.buttons}>
                    <button className={s.cancelButton} onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </button>
                    <button className={s.deleteButton} onClick={() => {
                        deleteAccount();
                        setShowDeleteModal(false);
                    }}>
                        <i className="fas fa-trash-alt"></i> Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;