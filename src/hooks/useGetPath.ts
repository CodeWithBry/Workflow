export function useGetPath(): string[] {
    const hash = window.location.hash;
    const parts = hash.split("/")
    return parts;
}