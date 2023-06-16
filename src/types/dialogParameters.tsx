export type DialogParameters = {
    title: string;
    content: JSX.Element[];
    actions: DialogAction[];
    closeFunction: (() => void) | null;
}

export type DialogAction = {
    label: string;
    icon?: string;
    onClick: () => void;
}
