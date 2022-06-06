import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Confirm(obj) {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: obj.title,
    text: obj.content,
    icon: obj.icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
        obj.functionToYes();
    }
  });
}

export default Confirm;
