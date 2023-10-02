import { useState, Dispatch, SetStateAction } from "react";
import "../../assets/style/admin.scss";

import { Link } from "react-router-dom";

interface SAProps {
  toggleMenuMobile: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarAdmin(props: SAProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`div_sidebar_admin ${isOpen ? "buka_menu" : "tutup_menu"}`}
      >
        <div>
          <Link className="menu_admin" to={"/admin/"}>
            Dashboard
          </Link>
          <Link className="menu_admin" to={"blog"}>
            Blog
          </Link>
          <Link className="menu_admin" to={"kategori"}>
            Kategori
          </Link>
        </div>
      </div>
      <button
        className={`toggle_menu_mobile ${
          isOpen ? "buka_menu_burger" : "tutup_menu_burger"
        }`}
        onClick={() => {
          props.toggleMenuMobile((value) => !value);
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <img
          alt="burger_menu"
          src={require("../../assets/img/icon/burger-bar.png")}
        />
      </button>
    </>
  );
}
