import { PropsWithChildren } from 'react';
import './style.scss';

export default function Pill(props: PropsWithChildren<{ onClick?: () => void, class?: string }>) {
  let classNames = "pill";

  if (props.onClick !== undefined) {
    classNames += " clickable";
  }

  if (props.class !== undefined) {
    classNames += " " + props.class;
  }

  return (
    <div className={classNames} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
