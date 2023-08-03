import { forwardRef } from 'react';
import './style.scss';

export const MaterialInput = forwardRef(
  function MaterialInput(
    props: {
      placeholder: string,
      type: React.HTMLInputTypeAttribute,
    },
    ref: any,
  ) {
    return (
      <input
        className='material-input'
        type={props.type}
        name="input"
        placeholder={props.placeholder}
        ref={ref}
      />
    );
  }
);
