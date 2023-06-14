export type DialogParameters = {
    title: string;
    content: string | JSX.Element;
    actions: DialogAction[];
    closeFunction: () => void;
}

export type DialogAction = {
    label: string;
    icon?: string;
    onClick: () => void;
}
