import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import dateFormat, { masks } from "dateformat";
import DFormat from "../components/etc/DFormat";

import RSModalSpinner from "../components/etc/RSModalSpinner";

masks.Waktu = "d mmmm yyyy,HH:MM";

interface blogType {}

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function Home() {
  const [blog, setBlog] = useState<blogType[]>([]);

  const childRef = useRef<typeRef>(null);

  function getBlogFront() {
    console.log("CekAdmin");

    childRef.current?.setStatusModal(true);

    axios
      .get(`${window.config.api}/getblogfront`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setBlog(res.data.blog);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((err) => {
        console.log(err);
        childRef.current?.setStatusModal(false);
      });
  }

  useEffect(() => {
    getBlogFront();
  }, []);

  DFormat("id");

  return (
    <>
      <div className="content_home">
        {blog.length == 0 ? (
          <h5>Data Kosong</h5>
        ) : (
          blog &&
          blog.map((data: any, index) => (
            <React.Fragment key={index}>
              <div className="card_blog_home">
                <Link to={`blog/${data.id}`} className="link_blog_home">
                  <img alt="image" src={data.foto} width={100} className="img_blog_home" />
                  <div className="judul_blog_home">{data.judul}</div>
                  {/* <div>{dateFormat(data.createdAt, "Waktu")}</div> */}
                </Link>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
      <RSModalSpinner ref={childRef} />
    </>
  );
}
