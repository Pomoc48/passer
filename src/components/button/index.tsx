import './style.css';

export default function MaterialButton(
  params: {
    label: string,
    onClick: () => void,
    icon?: string,
    type?: "filled" | "tonal" | "text",
    isFAB?: boolean,
  },
) {
  let classList = "material label-large clickable";

  if (params.icon !== undefined) {
    classList += " icon";
  }

  if (params.type === "tonal") {
    classList += " tonal";
  }

  if (params.type === "text") {
    classList += " text";
  }

  if (params.isFAB === true) {
    classList += " FAB";
  }

  return (
    <button type='button' className={classList} onClick={params.onClick}>
      {
        params.icon !== undefined
          ? <span className="material-icons">{params.icon}</span>
          : null
      }
      {params.label}
    </button>
  );
}
