import s from "../components/Task/styles.module.css"
export function showTaskToScreen(id: string) {
    const groupsContainer = document.querySelector("#groupsContainer");
    if (!groupsContainer) return;
    const task = groupsContainer.querySelector(`#${id}`);

    task?.classList.add(`${s.focused}`)
    task?.scrollIntoView({
        behavior: "smooth",
    });

    setTimeout(() => {
        task?.classList.remove(`${s.focused}`);
    }, 1500);

}