import { useState, useEffect, useRef } from "react";

import axios from "axios";

import RSModalSpinner from "../components/etc/RSModalSpinner";

import { Helmet } from "react-helmet-async";
import ListBlog from "../components/content/Front/ListBlog";
import SidebarHome from "../components/content/Front/SidebarHome";
import FeaturedBlog from "../components/content/Front/FeaturedBlog";

import { useParams } from "react-router-dom";

interface blogType {}
interface typeRef {
  setStatusModal(value: boolean): void;
}

export interface halamanType {
  disabled : boolean
}

export default function Home() {
  const [blog, setBlog] = useState<blogType[]>([]);
  const [halaman, setHalaman] = useState<halamanType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const childRef = useRef<typeRef>(null);

  let { page } = useParams();

  function getBlogFront() {
    console.log("CekAdmin");

    childRef.current?.setStatusModal(true);
    setLoading(true);

    var formData = new FormData();
    formData.append("page", page || '1');

    axios
      .post(`${window.config.api}/getblogfront`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setBlog(res.data.blog);
          setHalaman(res.data.halaman);
        }
        childRef.current?.setStatusModal(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        childRef.current?.setStatusModal(false);
        setLoading(false);
      });
  }

  useEffect(() => {
    getBlogFront();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>{window.config.appname}</title>
      </Helmet>

      <div className="div_latest_post">
        <div className="latest_post">FEATURED POST</div>
        <div className="divider"></div>
      </div>
      <FeaturedBlog />

      <div className="div_latest_post">
        <div className="latest_post">LATEST POST</div>
        <div className="divider"></div>
      </div>
      <div className="content_home">
        <ListBlog loading={loading} blog={blog} halaman={halaman} isLatestBlog={true} />
        <SidebarHome />
      </div>
      <RSModalSpinner ref={childRef} />
    </>
  );
}
