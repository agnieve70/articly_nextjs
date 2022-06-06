import React from "react";
import Logo from "./Logo";

function FormContainer(props) {
  return (
    <div className="container">
      <div className="row justify-content-center mt-2">
        <div
          className={`${
            props.colSize ? props.colSize : "col-md-6"
          } align-self-center`}
        >
          {props.withLogo && <Logo width={120} height={120} />}

          <div className="card p-5 shadow">
            <h2 className="text-center text-secondary">{props.title}</h2>
            {/* Form Container */}
            <div className="row justify-content-center my-4">
              <div className="col-md-7 align-self-center">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
