import { useEffect, useState } from 'react';
import './style.scss';

export default function Snackbar(
  params: {
    message: String,
    close: () => void,
    extraSpace?: boolean,
    long?: boolean,
  },
) {
  const [closed, setClosed] = useState(false);

  let duration = 3000;

  if (params.long) {
    duration = 6000;
  }

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => params.close(), 300);
      setClosed(true);
    }, duration - 300);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={params.extraSpace ? "snackbar extra-space" : "snackbar"}
      style={closed ? { animation: "fade-out 0.3s forwards" } : undefined}
    >
      <p>{params.message}</p>
    </div>
  );
}
