import React, { useRef, useState, useEffect } from "react";

import "../assets/style/login.scss";

import Swal from "sweetalert2";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import RSModalSpinner from "../components/etc/RSModalSpinner";

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") != null) {
      navigate("/");
    }
    console.log(sessionStorage.getItem("isLogin"));
  }, []);

  function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log("handleLogin");

    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post(`${window.config.api}/login`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          modalNotif("success", res.data.Message, "");
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("kode_akses", res.data.User.kode_akses);
          sessionStorage.setItem("nama", res.data.User.nama);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          modalNotif(
            "error",
            res.data.Message,
            "Username atau password salah!"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        modalNotif("error", "Login Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  const childRef = useRef<typeRef>(null);

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
      <form className="form_login" onSubmit={handleLogin}>
        <div className="login_text" data-testid="login_title">LOGIN</div>
        <div>
          <div>Username</div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            // name="username"
            className="input_login"
            data-testid="username"
            autoFocus
            required
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
            className="input_login"
            data-testid="password"
            required
          />
        </div>
        <button type="submit" className="btn_submit">
          LOGIN
        </button>
      </form>
      <RSModalSpinner ref={childRef} />
    </>
  );
}
