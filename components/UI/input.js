import React from 'react'

function Input(props) {
  return (
    <div className="form-group mb-3">
      <label htmlFor={props.labelid}>{props.label}</label>
      <input
        id={props.labelid}
        type={props.type}
        ref={props.inputref}
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