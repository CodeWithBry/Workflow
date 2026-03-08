import { useState, useEffect } from "react";
import s from "./styles.module.css";

function Loading({ isLoading, desc }: { isLoading: boolean, desc: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setFadeOut(false);
    } else if (isVisible) {
      // Start fade out when loading is done
      setFadeOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setFadeOut(false);
      }, 500); // Match the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isLoading, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${s.overlay} ${fadeOut ? s.fadeOut : ''} ${!isVisible && s.hide}`}>
      <div className={s.container}>
        <div className={s.spinner}></div>
        <p className={s.text}>{desc}</p>
      </div>
    </div>
  );
}

export default Loading;