import { ButtonProps } from "./buttonProps";

export type DialogProps = {
    title?: string;
    content: JSX.Element[];
    additionalContent?: JSX.Element[];
    actions: ButtonProps[];
    closeFunction: () => void;
    extraWide?: boolean;
    dismissible: boolean;
    class: string;
    icons?: {
        icon: string;
        filled: boolean;
        onClick: () => void;
    }[];
}
