export type DialogParameters = {
    title: string;
    content: string | JSX.Element;
    actions: DialogAction[];
    closeFunction: () => void;
}

export type DialogAction = {
    name: string;
    onClick: () => void;
}
