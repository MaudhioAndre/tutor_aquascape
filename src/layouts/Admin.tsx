import React, { useRef, useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderBack from "../components/header/HeaderBack";
import FooterBack from "../components/footer/FooterBack";
import DashboardAdmin from "../pages/DashboardAdmin";
import BlogAdmin from "../pages/BlogAdmin";

import axios from "axios";
import RSModalSpinner from "../components/etc/RSModalSpinner";
import SidebarAdmin from "../components/etc/SidebarAdmin";

import "../assets/style/admin.scss";

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function Admin() {
  const [kode_akses, ] = useState<any>(sessionStorage.getItem("kode_akses"));
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const childRef = useRef<typeRef>(null);

  function CekAdmin(){
    console.log('CekAdmin');
    

    var formData = new FormData();
    formData.append("kode_akses", kode_akses);

    childRef.current?.setStatusModal(true);

    axios
      .post(`${window.config.api}/cekadmin`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0 && res.data.akses[0]['level'] != 'Admin') {
          navigate("/");
        } 
        childRef.current?.setStatusModal(false);
      })
      .catch((err) => {
        console.log(err);
        childRef.current?.setStatusModal(false);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") == null) {
      navigate("/");
    }else{
      CekAdmin();
    }
    console.log(sessionStorage.getItem("isLogin"));
  }, []);

  return (
    <>
      <HeaderBack />
      {/* <div className= {`div_utama_admin ${isOpen && 'dcu_buka_menu'}`}> */}
      <div className= {`div_utama_admin`}>
      <SidebarAdmin toggleMenuMobile={setIsOpen} />
      <div className={`div_content_utama`}>
      {/* <SidebarAdmin toggleMenuMobile={setIsOpen} /> */}
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/blog" element={<BlogAdmin />} />
      </Routes>
      </div>
      </div>
      <FooterBack />
      <RSModalSpinner ref={childRef} />
    </>
  );
}

function NotFound(){
  return <h2>Page Not Found</h2>
}
