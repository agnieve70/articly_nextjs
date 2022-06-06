import React from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Toast(obj) {

    const MySwal = withReactContent(
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: obj.timer ? obj.timer : 8000,
        timerProgressBar: true,
      })
    );

    MySwal.fire({
      icon: obj.icon,
      title: obj.title,
      text: obj.content ? obj.content : "",
    });
 
}

export default Toast