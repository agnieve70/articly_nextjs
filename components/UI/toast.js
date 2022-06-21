import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Toast(obj) {

    const MySwal = withReactContent(
      Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: obj.showConfirmButton ? true : false,
        showCancelButton: obj.showConfirmButton ? true : false,
        confirmButtonText: obj.showConfirmButton,
        timer: obj.timer ? obj.timer : false,
        timerProgressBar: true,
        preConfirm: obj.confirmHandler,
      })
    );

    MySwal.fire({
      icon: obj.icon,
      title: obj.title,
      text: obj.content ? obj.content : "",
    });
 
}

export default Toast