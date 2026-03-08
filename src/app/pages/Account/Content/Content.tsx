import { useContext, useEffect, useState, type ChangeEvent, type Dispatch, type FocusEvent, type SetStateAction } from "react";
import s from "./styles.module.css";
import { context } from "../../../context/AppContext";
import { handleUploadImage } from "../utils/handleUploadImage";
import Button from "../../../../components/ui/Button";
import Loading from "../modals/Uploading/Uploading";

function Content({ setShowChangePass, setShowDeleteModal }: {
  setShowChangePass: Dispatch<SetStateAction<boolean>>,
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
}) {
  const { darkMode, userInfo, setUserInfo, setShowVerifySignOut } = useContext(context) as Context;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandImage, setExpandImage] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    setFullName(userInfo ? userInfo.fullName : "");
    setEmail(userInfo ? userInfo.email : "");
    setUserName(userInfo?.userName ? userInfo.userName : "");
  }, [userInfo])

  return (
    <div className={`${s.content} ${darkMode && s.dark}`}>
      <Loading isLoading={isLoading} desc="Uploading..." />
      {expandImage
        && <div onClick={() => setExpandImage(prev => !prev)} className={s.expandImgWrapper}>
          <img src={userInfo?.photoData ? userInfo.photoData.secure_url : "./blank_profile.png"} />
        </div>}
      {/* Divided into three parts: Profile, Personal Info, Security and Danger Zone */}
      <div className={`${s.profile} ${s.section}`}>
        <div className={s.wrapper}>
          <div className={s.imgContainer}>
            <div className={s.img} onClick={() => setExpandImage(true)} style={{ backgroundImage: `url(${userInfo?.photoData ? userInfo.photoData.secure_url : "./blank_profile.png"})` }}></div>
            <input type="file" className={s.fileInput} onChange={(e: ChangeEvent<HTMLInputElement>) => { if (userInfo) handleUploadImage(e, userInfo, setUserInfo, setIsLoading) }} id="fileInput" />
          </div>
          <div className={s.textContainer}>
            <p className={s.title}>Profile Picture</p>
            <span>JPG, JPEG and PNG. Max Size of 5mb.</span>
            <label className={s.uploadButton} htmlFor="fileInput"> Upload Photo </label>
          </div>
        </div>
      </div>
      <div className={`${s.personalInfo} ${s.section}`}>
        <h2 className={s.title}> <i className="	far fa-user"></i> Personal Information</h2>
        <div className={s.form}>
          <div className={s.fullName}>
            <span>Full Name</span>
            <label htmlFor="fullNameInput" className={s.inputWrapper}>
              <i className="fas fa-user-edit"></i>
              <input
                type="text"
                value={fullName}
                id="fullNameInput"
                onFocus={(e: FocusEvent<HTMLInputElement>) => {
                  const parentElement = e.target.parentElement;
                  parentElement?.classList.add(`${s.focused}`);
                }}
                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                  const parentElement = e.target.parentElement;
                  parentElement?.classList.remove(s.focused);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFullName(e.target.value);
                  setUserInfo(prev => {
                    if (!prev) return prev;
                    return { ...prev, fullName: e.target.value };
                  });
                }} />
            </label>
          </div>

          <div className={s.emailAndUsername}>
            <div className={s.email}>
              <span>Email</span>
              <label htmlFor="emailInput" className={s.inputWrapper}>
                <i className="fa fa-envelope"></i>
                <input
                  type="text"
                  value={email}
                  id="emailinput"
                  onFocus={(e: FocusEvent<HTMLInputElement>) => {
                    const parentElement = e.target.parentElement;
                    parentElement?.classList.add(`${s.focused}`);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    const parentElement = e.target.parentElement;
                    parentElement?.classList.remove(s.focused);
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </label>
            </div>
            <div className={s.userName}>
              <span>Username</span>
              <label htmlFor="userNameInput" className={s.inputWrapper}>
                <i className="far fa-address-card"></i>
                <input
                  type="text"
                  value={userName}
                  placeholder="Username"
                  id="userNameInput"
                  onFocus={(e: FocusEvent<HTMLInputElement>) => {
                    const parentElement = e.target.parentElement;
                    parentElement?.classList.add(`${s.focused}`);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    const parentElement = e.target.parentElement;
                    parentElement?.classList.remove(s.focused);
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                    setUserInfo(prev => {
                      if (!prev) return prev;
                      setUserName(e.target.value);
                      return { ...prev, userName: e.target.value };
                    })
                  }} />
              </label>
            </div>
          </div>
        </div>
      </div>
      {
        userInfo?.password && <div className={`${s.security} ${s.section}`}>
          <h2 className={s.title}> <i className="	fas fa-user-shield"></i> Security</h2>
          <div className={s.wrapper}>
            <p>
              <i className="	fas fa-lock"></i>
              Password
            </p>
            <Button
              className={s.changePassword}
              clickListener={() => setShowChangePass(true)}
              content={"Change Password"} />
          </div>
        </div>
      }
      <div className={`${s.dangerZone} ${s.section}`}>
        <h2 className={s.title}> <i className="	fas fa-exclamation-triangle"></i> Danger Zone</h2>
        <div className={s.wrapper} onClick={() => setShowVerifySignOut(true)}>
          <p>
            <i className="fas fa-sign-out-alt"></i>
            Log Out
          </p>
          <span>End your current session</span>
        </div>
        <div className={s.wrapper} onClick={() => setShowDeleteModal(true)}>
          <p>
            <i className="far fa-trash-alt"></i>
            Delete Account
          </p>
          <span>Permanently delete your data</span>
        </div>
      </div>
    </div>
  )
}

export default Content