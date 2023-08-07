import { ButtonProps } from "./buttonProps";

export type DialogProps = {
    title: string;
    content: JSX.Element[];
    additionalContent?: JSX.Element[];
    actions: ButtonProps[];
    closeFunction: () => void;
    maxWidth?: number;
    dismissible: boolean;
    class: string;
}
