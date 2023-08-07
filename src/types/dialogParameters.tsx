import { ButtonProps } from "./buttonProperties";

export type DialogParameters = {
    title: string;
    content: JSX.Element[];
    additionalContent?: JSX.Element[];
    actions: ButtonProps[];
    closeFunction: () => void;
    maxWidth?: number;
    dismissible: boolean;
    class: string;
}
