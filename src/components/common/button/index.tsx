import { CSSProperties, useEffect, useState } from 'react';
import { ButtonProps } from '../../../types/buttonProps';
import './style.scss';
import { easeOutCubic } from '../../../functions/utils';

export default function MaterialButton(params: ButtonProps) {
  const [progress, setProgress] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!play) {
      if (progress > 0) {
        setTimeout(() => setProgress(progress - 0.01), 5);
        return;
      }

      setProgress(0);
      return;
    }

    if (progress < 1) {
      setTimeout(() => {
        if (play) {
          setProgress(progress + 0.01);
        }
      }, 15);

      return;
    }

    click();
    setPlay(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, progress]);

  function mouseDown() {
    if (params.confirmation === true && progress === 0) {
      setPlay(true);
    }
  }

  function mouseUp() {
    if (params.confirmation === true) {
      setPlay(false);
      return;
    }

    click();
  }

  function mouseLeave() {
    if (params.confirmation === true) {
      setPlay(false);
      return;
    }
  }

  function click() {
    if (params.onClick !== undefined) {
      params.onClick();
    }
  }

  let classList = "material ";

  if (params.type === undefined) {
    classList += "filled";
  } else {
    classList += params.type
  }

  if (params.confirmation === true) {
    classList += " confirm";
  }

  return (
    <button
      onMouseDown={mouseDown}
      onTouchStart={mouseDown}
      onMouseUp={mouseUp}
      onTouchCancel={mouseUp}
      onMouseLeave={mouseLeave}
      onTouchMove={mouseLeave}
      id={params.id}
      type='button'
      className={classList}
      style={{ '--button-width': easeOutCubic(progress) * 100 + "%" } as CSSProperties}
    >
      <span className="material-icons-outlined">{params.icon}</span>
      <p>{params.label}</p>
    </button>
  );
}
