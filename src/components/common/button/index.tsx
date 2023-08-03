import './style.scss';

export default function MaterialButton(
  params: {
    label: string,
    onClick: () => void,
    icon: string,
    type?: "filled" | "tonal" | "text" | "error" | "FAB",
  },
) {
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
