import React, {
    useState,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";
  import axios from "axios";
  import ModalNotif from "../etc/ModalNotif";
  import RSModalSpinner from "../etc/RSModalSpinner";
  import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
  
  import SunEditor from "suneditor-react";
  import "suneditor/dist/css/suneditor.min.css";
  import {
    align,
    fontSize,
    fontColor,
    hiliteColor,
    list,
  } from "suneditor/src/plugins";
  
  import { kategoriType } from "../../pages/KategoriAdmin";
  
  const parse = require("html-react-parser");
  
  interface propTypes {
    getKategori: () => void;
    modalIsOpen: boolean;
    toggleModal: Dispatch<SetStateAction<boolean>>;
    setAksi: Dispatch<SetStateAction<string>>;
    dataEdit: kategoriType;
    aksiModal: string;
  }
  
  interface typeRef {
    setStatusModal(value: boolean): void;
  }
  
  export default function ModalKategori({
    getKategori,
    modalIsOpen,
    toggleModal,
    dataEdit,
    aksiModal,
    setAksi,
  }: propTypes) {
    const [modal, setModal] = useState<boolean>(modalIsOpen);
    // const [aksi, setAksi] = useState<string>(aksiModal || "tambah");
    const [id, setId] = useState<string>("");
    const [nama, setNama] = useState<string>("");
    const [foto, setFoto] = useState<File | undefined>(undefined);
    const [prevFoto, setPrevFoto] = useState<string>();
  
    function onCloseModal() {
      setNama("");
      setFoto(undefined);
      setModal(false);
      // setAksi("tambah");
      setPrevFoto("");
      toggleModal(false);
      setAksi("tambah");
    }
  
    useEffect(() => {
      setModal(modalIsOpen);
    }, [modalIsOpen]);
  
    useEffect(() => {
      setId(dataEdit.id);
      setNama(dataEdit.nama);
      setPrevFoto(dataEdit.foto);
    }, [dataEdit]);
  
    function tambahKategori(e: React.SyntheticEvent) {
      console.log("tambahKategori");
  
      e.preventDefault();
      childRef.current?.setStatusModal(true);
  
      var formData = new FormData();
      formData.append("nama", nama);
      formData.append("foto", foto!);
  
      axios
        .post(`${window.config.api}/tambahkategori`, formData)
        .then((res) => {
          console.log(res);
          childRef.current?.setStatusModal(false);
          if (res.data.Error == 0) {
            getKategori();
            ModalNotif("success", res.data.Message, "");
            setTimeout(() => {
              onCloseModal();
              setAksi("tambah");
            }, 2000);
          } else {
            ModalNotif("error", res.data.Message, "");
          }
        })
        .catch((err) => {
          console.log(err);
          ModalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
          childRef.current?.setStatusModal(false);
        });
    }
  
    function ubahKategori(e: React.SyntheticEvent) {
      e.preventDefault();
      childRef.current?.setStatusModal(true);
  
      var formData = new FormData();
      formData.append("id", id);
      formData.append("nama", nama);
      formData.append("foto", foto!);
  
      axios
        .post(`${window.config.api}/ubahkategori`, formData)
        .then((res) => {
          console.log(res);
          childRef.current?.setStatusModal(false);
          if (res.data.Error == 0) {
            getKategori();
            ModalNotif("success", res.data.Message, "");
            setTimeout(() => {
              onCloseModal();
            }, 2000);
          } else {
            ModalNotif("error", res.data.Message, "");
          }
        })
        .catch((err) => {
          console.log(err);
          ModalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
          childRef.current?.setStatusModal(false);
        });
    }
  
    const childRef = useRef<typeRef>(null);
  
    return (
      <>
        <Modal isOpen={modal} className={"modal_blog"}>
          <ModalHeader toggle={() => onCloseModal()}>
            {aksiModal == "tambah" ? "Tambah" : "Ubah"} Kategori
          </ModalHeader>
          <form onSubmit={aksiModal == "tambah" ? tambahKategori : ubahKategori}>
            <ModalBody>
              <div className="div_form_group">
                <div className="label_input_blog">
                  Nama <div className="mandatory">&nbsp;*</div>
                </div>
                <input
                  type="text"
                  onChange={(e) => setNama(e.target.value)}
                  required
                  value={nama}
                  maxLength={100}
                  className="input_text_blog"
                />
              </div>
              <div className="div_form_group input_foto">
                <div>
                  <div className="label_input_blog">
                    Foto <div className="mandatory">&nbsp;*</div>
                  </div>
                  <img
                    src={
                      prevFoto == "" || prevFoto == undefined
                        ? require("../../assets/img/addBg.jpg")
                        : prevFoto
                    }
                    className="img-prevFoto"
                  />
                </div>
                <input
                  type="file"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setPrevFoto(
                      URL.createObjectURL(
                        (e.target as HTMLInputElement)?.files?.[0]!
                      )
                    );
                    setFoto((e.target as HTMLInputElement)?.files?.[0]);
                  }}
                  required={aksiModal == "tambah" ? true : false}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn_admin">
                Simpan
              </button>
            </ModalFooter>
          </form>
        </Modal>
  
        <RSModalSpinner ref={childRef} />
      </>
    );
  }
  