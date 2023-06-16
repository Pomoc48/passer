export type DialogParameters = {
    title: string;
    content: JSX.Element[];
    actions: DialogAction[];
    closeFunction?: () => void;
    maxWidth?: number;
}

export type DialogAction = {
    label: string;
    onClick?: () => void;
    icon?: string;
    type?: "filled" | "tonal" | "text",
}
