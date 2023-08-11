import './style.scss';

export default function ErrorMessage(params: { icon: string, message: string }) {
  return (
    <div className="error-message">
      <span className="material-symbols-outlined">
        {params.icon}
      </span>
      <p>{params.message}</p>
    </div>
  );
}
