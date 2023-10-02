import Swal from "sweetalert2";

interface propTypes {
  type: any;
  title: any;
  text: any;
}

export default function ModalNotif(type: any, title: any, text: any) {
  return Swal.fire({
    icon: type,
    title: title,
    text: text,
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    console.log("then");
  });
}
