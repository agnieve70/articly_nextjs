import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function MarkerHolder(obj) {
   const MySwal = withReactContent(
    Swal.mixin({
     toast: true,
     imageUrl: "/avatar-boy.png",
     imageWidth: 100,
     imageHeight: 100,
     imageAlt: "Custom image",
     position: "center",
     showConfirmButton: true,
     showCancelButton: true,
     confirmButtonText: "Matter Resolved",
     preConfirm: () => {
      alert("payts")
     }
   })
   );

     MySwal.fire({
       icon: obj.icon,
       title: obj.title,
       text: obj.content ? obj.content : "",
     });
}

export default MarkerHolder;
