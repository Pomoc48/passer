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

export function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}
