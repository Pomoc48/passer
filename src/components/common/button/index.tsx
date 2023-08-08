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
    <button
      id={params.id}
      type='button'
      className={classList}
      onClick={params.onClick}
    >
      <span className="material-icons">{params.icon}</span>
      <p>{params.label}</p>
    </button>
  );
}
