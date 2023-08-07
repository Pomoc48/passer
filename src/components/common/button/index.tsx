import { ButtonProps } from '../../../types/buttonProps';
import './style.scss';

export default function MaterialButton(params: ButtonProps) {
  let classList = "material ";

  if (params.type === undefined) {
    classList += "filled";
  } else {
    classList += params.type
  }

  return (
    <button type='button' className={classList} onClick={params.onClick}>
      {
        params.icon !== undefined
          ? <span className="material-icons">{params.icon}</span>
          : null
      }
      <p>{params.label}</p>
    </button>
  );
}
