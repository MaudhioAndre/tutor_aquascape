import "../../assets/style/admin.scss";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function HeaderBack() {
  const navigate = useNavigate();

  function Logout() {
    console.log("logout");
    modalNotif("success", "Logout Berhasil", "");
    setTimeout(() => {
      sessionStorage.removeItem("kode_akses");
      sessionStorage.removeItem("nama");
      sessionStorage.removeItem("isLogin");
      navigate("/");
    }, 2000);
  }

  function modalNotif(type: any, title: string, text: string) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      console.log("then");
    });
  }

  return (
    <>
      <div className="div_header_admin">
        <div>ADMIN</div>
        <button onClick={() => Logout()} className="btn_admin btn_logout">Logout</button>
      </div>
    </>
  );
}
