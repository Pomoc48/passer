import { useEffect } from 'react';
import './style.scss';

export default function Snackbar(
  params: {
    message: String,
    close: () => void,
    mobile: boolean,
    long?: boolean,
  },
) {
  let duration = 3000;

  if (params.long) {
    duration = 6000;
  }

  useEffect(() => {
    setTimeout(() => {
      document.getElementsByClassName("snackbar")[0].classList.add("open");
    }, 1);

    setTimeout(() => {
      document.getElementsByClassName("snackbar")[0].classList.remove("open");
      setTimeout(() => params.close(), 300);
    }, duration - 300);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={params.mobile ? "snackbar mobile" : "snackbar"}>
      <p>{params.message}</p>
    </div>
  );
}
