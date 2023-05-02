import './style.scss';

export default function MaterialButton(params: {name: string, onClick: () => void}) {
  return (
    <div className="MaterialButton">
      <button type='button' onClick={params.onClick}>{params.name}</button>
    </div>
  );
}
