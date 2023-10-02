import React, { Dispatch, SetStateAction} from "react";

import axios from "axios";
import Swal from "sweetalert2";
import ModalNotif from "../etc/ModalNotif";

import { kategoriType } from "../../pages/KategoriAdmin";

import DFormat from "../../components/etc/DFormat";
import dateFormat, { masks } from "dateformat";
masks.Waktu = "d mmmm yyyy,HH:MM";

interface propsType {
  kategori: kategoriType[];
  openModalEdit: () => void;
  getKategori: () => void;
  setStatusModal: any;
  setDataEdit : Dispatch<SetStateAction<kategoriType>>;
}

export default function ContentKategori(props: propsType) {
  function ubahStatusKategori(id: string, status: string) {
    props.setStatusModal(true);

    var formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);

    axios
      .post(`${window.config.api}/ubahstatuskategori`, formData)
      .then((res) => {
        console.log(res);
        props.setStatusModal(false);
        if (res.data.Error == 0) {
          props.getKategori();
          ModalNotif("success", res.data.Message, "");
        } else {
          ModalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        ModalNotif("error", "Gagal", "Terjadi kesalahan pada sistem!");
        props.setStatusModal(false);
      });
  }

  function hapusKategori(id: string) {
    Swal.fire({
      title: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      confirmButtonColor: "#ff0055",
      cancelButtonColor: "#999999",
      cancelButtonText: "Batal",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
    }).then((res) => {
      if (res.value) {
        props.setStatusModal(true);

        var formData = new FormData();
        formData.append("id", id);
        axios
          .post(`${window.config.api}/hapuskategori`, formData)
          .then((res) => {
            console.log(res);
            props.setStatusModal(false);
            if (res.data.Error == 0) {
              props.getKategori();
              ModalNotif("success", res.data.Message, "");
            } else {
              ModalNotif("error", res.data.Message, "");
            }
          })
          .catch((err) => {
            console.log(err);
            ModalNotif(
              "error",
              "Gagal",
              "Terjadi kesalahan pada sistem!"
            );
            props.setStatusModal(false);
          });
      }
    });
  }

  DFormat("id");
  return (
    <>
      {props.kategori.length == 0 ? (
        <h5>Data Kosong</h5>
      ) : (
        props.kategori &&
        props.kategori.map((data: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <div className="card_blog" data-testid="card_blog">
                <img src={data.foto} alt="image" className="img_blog" />
                <div className="div_desc_blog">
                  <div className="title_blog">{data.nama}</div>
                  <div className="div_footer_content">
                    <div>{dateFormat(data.createdAt, "Waktu")}</div>
                    <div className="div_utility_button">
                      {data.recordStatus === "N" ? (
                        <button
                          className="btn_utility_button"
                          onClick={() => ubahStatusKategori(data.id, "D")}
                        >
                          <img
                            className="icon_utility"
                            src={require("../../assets/img/icon/close.png")}
                          />
                        </button>
                      ) : (
                        <button
                          className="btn_utility_button"
                          onClick={() => ubahStatusKategori(data.id, "N")}
                        >
                          <img src={require("../../assets/img/icon/check.png")} />
                        </button>
                      )}
                      <button
                        className="btn_utility_button"
                        onClick={() => {
                          props.openModalEdit();
                          props.setDataEdit({
                            id : data.id,
                            nama : data.nama,
                            foto : data.foto,
                            recordStatus : data.recordStatus,
                          })
                        }
                        }
                      >
                        <img
                          className="icon_utility"
                          src={require("../../assets/img/icon/pencil.png")}
                        />
                      </button>
                      <button
                        className="btn_utility_button"
                        onClick={() => hapusKategori(data.id)}
                      >
                        <img
                          className="icon_utility"
                          src={require("../../assets/img/icon/trash-can.png")}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })
      )}
    </>
  );
}
