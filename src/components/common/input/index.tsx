import { forwardRef } from 'react';
import './style.scss';

export const MaterialInput = forwardRef(
  function MaterialInput(
    props: {
      placeholder: string,
      type: React.HTMLInputTypeAttribute,
      isMultiline?: boolean,
    },
    ref: any,
  ) {
    if (props.isMultiline === true) {
      return (
        <textarea
          className='material-input textarea'
          name="input"
          placeholder={props.placeholder}
          ref={ref}
          rows={3}
        />
      );
    }
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
