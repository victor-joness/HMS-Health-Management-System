export function isNullOrEmpty(value: string): boolean {
    if(value === null) return true;
    if(value === undefined) return true;
    if(value === "") return true;

    return false;
}
