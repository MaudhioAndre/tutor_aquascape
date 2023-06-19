import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import axios from "axios";

import RSModalSpinner from "../etc/RSModalSpinner";

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function HeaderFront() {
  const [kode_akses] = useState<any>(sessionStorage.getItem("kode_akses"));
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const childRef = useRef<typeRef>(null);

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

  function CekAdmin() {
    console.log("CekAdmin");

    var formData = new FormData();
    formData.append("kode_akses", kode_akses);

    childRef.current?.setStatusModal(true);

    axios
      .post(`${window.config.api}/cekadmin`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0 && res.data.akses[0]["level"] == "Admin") {
          setIsAdmin(true);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((err) => {
        console.log(err);
        childRef.current?.setStatusModal(false);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== null) {
      CekAdmin();
    }
    console.log(sessionStorage.getItem("isLogin"));
  }, []);

  return (
    <>
      <div className="header_front">
        <Link to="/" className="title_header">AQUASCAPE TUTORIAL</Link>
        {/* <div className="title_header">AQUASCAPE TUTORIAL</div> */}
        {isAdmin && (
          <>
            <div>
              <button className="btn_front">
                <Link to="/admin">Admin</Link>
              </button>
              &nbsp;
              <button onClick={() => Logout()} className="btn_front">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      <RSModalSpinner ref={childRef} />
    </>
  );
}
