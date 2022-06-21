import React from 'react'

function ButtonContainer(props) {
  return (
    <div className="col-md-4">
      <div className="card p-4 pt-5 mb-5 shadow">
        <div className="row justify-content-center ">
          <button
            disabled={props.disable}
            onClick={props.handleClick}
            className={`col-10 btn mb-1 btn-${props.type}`}
          >
            <h4 className="mt-2">{props.title}</h4>
          </button>
          <p className="col-10 text-muted">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ButtonContainer