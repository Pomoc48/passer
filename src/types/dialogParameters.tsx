export type DialogParameters = {
    title: string;
    content: JSX.Element[];
    additionalContent?: JSX.Element[];
    actions: DialogAction[];
    closeFunction: () => void;
    maxWidth?: number;
    dismissible: boolean;
    class: string;
}

export type DialogAction = {
    label: string;
    onClick?: () => Promise<boolean>;
    icon: string;
    type?: "filled" | "tonal" | "text" | "error" | "FAB",
}
