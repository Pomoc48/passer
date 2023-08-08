export function urlValid(url: string | null): boolean {
    if (url === null) {
        return false;
    }

    try {
        new URL(url);
    } catch (e) {
        return false;
    }

    return true;
}
