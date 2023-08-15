import { PropsWithChildren } from 'react';
import './style.scss';

export default function DataContainer(props: PropsWithChildren<{ empty?: boolean, noteFormatting?: boolean }>) {
  let classNames = "data-container-display";

  if (props.empty === true) {
    classNames += " empty";
  }

  if (props.noteFormatting === true) {
    classNames += " note-formatting";
  }

  return (
    <div className={classNames}>
      {props.children}
    </div>
  );
}
