export function getTabFromUrl(): string {
    const hash = window.location.hash;
    const parts = hash.split("/")
    return parts[1] || "";
}