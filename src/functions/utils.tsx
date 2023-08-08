export function isUrlValid(urlString: string | null): boolean {
    if (urlString === null) {
        return false;
    }

    let url;

    try {
        url = new URL(urlString);
    } catch (e) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
