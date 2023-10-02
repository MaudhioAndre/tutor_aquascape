import { useState, useEffect, useRef } from "react";

import "../../assets/style/Vmenu.scss";

import { Link, useNavigate } from "react-router-dom";

import { kategoriType } from "../../pages/KategoriAdmin";

import RSModalSpinner from "../etc/RSModalSpinner";

import axios from "axios";

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function MenuFront() {
  const [classMenu, setClassMenu] = useState<string>("topnav");
  const [listKategori, setListKategori] = useState<kategoriType[]>([]);

  const toggleMenu = () => {
    console.log("toggleMenu");
    setClassMenu((classMenu) =>
      classMenu == "topnav" ? classMenu + " responsive" : "topnav"
    );
  };

  const getKategoriFront = async () => {
    console.log("getParam4");
    childRef.current?.setStatusModal(true);
    await axios
      .get(`${window.config.api}/getkategorifront`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setListKategori(res.data.kategori);
        } else {
          setListKategori([]);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((error) => {
        console.log(error);
        childRef.current?.setStatusModal(false);
      });
  };

  useEffect(() => {
    getKategoriFront();
  }, []);

  const childRef = useRef<typeRef>(null);

  return (
    <>
      <div className="menu-utama">
        <div className={classMenu}>
          <div className="div-menu">
            {listKategori &&
              listKategori.map((data, index) => (
                <Link
                  to={`/blog/category/${data.nama}/${data.id}`}
                  className="menu-nav"
                  onClick={() => toggleMenu()}
                  key={index}
                >
                  {data.nama}
                </Link>
              ))}
          </div>
        </div>
        <button className="toggle-menu" onClick={() => toggleMenu()}>
          <img src={require("../../assets/img/icon/burger-bar.png")} />
        </button>
      </div>

      <RSModalSpinner ref={childRef} />
    </>
  );
}
