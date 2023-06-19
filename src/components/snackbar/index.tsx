import { useEffect } from 'react';
import './style.css';

export default function Snackbar(params: { message: String, close: () => void, mobile: boolean }) {
  useEffect(() => {
    setTimeout(() => {
      document.getElementsByClassName("snackbar")[0].classList.add("open");
    }, 1);

    setTimeout(() => {
      document.getElementsByClassName("snackbar")[0].classList.remove("open");
      setTimeout(() => params.close(), 300);
    }, 2700);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={params.mobile ? "snackbar mobile" : "snackbar"}>
      <p className='body-medium'>{params.message}</p>
    </div>
  );
}
