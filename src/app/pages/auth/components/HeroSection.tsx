import s from "./styles.module.css";

function HeroSection() {
    return (
        <div className={s.heroSection}>
            <img src="./heroImg.png" alt="image of a man" />
        </div>
    )
}

export default HeroSection