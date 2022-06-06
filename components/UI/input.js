import React from 'react'

function Input(props) {
  return (
    <div className="form-group mb-3">
      <label htmlFor={props.labelId}>{props.label}</label>
      <input
        id={props.labelId}
        type={props.type}
        ref={props.inputRef}
        className="form-control"
        {...props}
      />
      <span className="text-danger">
        {props.errorMessage ? "*" + props.errorMessage : ""}
      </span>
    </div>
  );
}

export default Input