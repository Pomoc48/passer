import { PropsWithChildren } from 'react';
import './style.scss';

export default function Card(props: PropsWithChildren<{ variant?: boolean }>) {
  let classNames = "card";

  if (props.variant) {
    classNames += " variant";
  }

  return (
    <div className={classNames}>
      {props.children}
    </div>
  );
}
