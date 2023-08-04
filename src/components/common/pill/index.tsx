import { PropsWithChildren } from 'react';
import './style.scss';

export default function Pill(props: PropsWithChildren<{ onClick?: () => void }>) {
  let classNames = "pill";

  if (props.onClick !== undefined) {
    classNames += " clickable";
  }

  return (
    <div className={classNames} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
