export type ButtonProps = {
    label: string;
    onClick?: (() => Promise<boolean>) | (() => void);
    icon: string;
    type?: "filled" | "tonal" | "text" | "error" | "FAB",
    outline?: boolean,
    id?: string,
    confirmation?: boolean,
}
