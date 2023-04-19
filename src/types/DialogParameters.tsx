export type DialogParameters = {
    title: string;
    content: string | JSX.Element;
    actions: DialogAction[];
}

export type DialogAction = {
    name: string;
    onClick: () => void;
}
