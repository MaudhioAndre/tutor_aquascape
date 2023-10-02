import React from "react";

import { Link } from "react-router-dom";

import dateFormat, { masks } from "dateformat";
import DFormat from "../../../components/etc/DFormat";

import { halamanType } from "../../../pages/Home";

interface blogType {}

interface propType {
  loading: boolean;
  blog: blogType[];
  isLatestBlog: boolean;
  halaman?: halamanType[];
}

masks.Waktu = "d mmmm yyyy";

export default function ListBlog(props: propType) {
  const { loading, blog, isLatestBlog, halaman } = props;

  DFormat("id");

  return (
    <>
      <div className="list_card_home">
        {loading ? (
          <h5>Loading...</h5>
        ) : blog.length == 0 ? (
          <h5>Content not found/empty</h5>
        ) : (
          <>
            {/* {isLatestBlog && (
              <>
                <div className="latest_post">LATEST POST</div>
                <div className="divider"></div>
              </>
            )} */}
            {/* <div className="div-latest-post">
              <div className="latest_post">LATEST POST</div>
              <div className="divider"></div>
            </div> */}

            {blog &&
              blog.map((data: any, index) => (
                <React.Fragment key={index}>
                  <div className="card_blog_home">
                    {/* <Link to={`blog/${data.id}`} className="link_blog_home"> */}
                    <Link
                      to={`/blog/${data.url_slug}`}
                      // to={`blog/${data.url_slug}`}
                      className="link_blog_home"
                    >
                      <img
                        alt="image"
                        src={data.foto}
                        className="img_blog_home"
                      />
                      <div className="content_card">
                        <div className="kategori_card">{data.namaKategori}</div>
                        <div className="judul_blog_home">{data.judul}</div>
                        <div className="tanggal_blog_home">
                          {dateFormat(data.createdAt, "Waktu")}
                        </div>
                      </div>
                    </Link>
                  </div>
                </React.Fragment>
              ))}

            {halaman && halaman?.length > 1 && (
              <div className="div_btn_halaman">
                {halaman.map((data, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={`/blog/page/${index + 1}`}
                      className="link_btn_halaman"
                      reloadDocument={true}
                    >
                      <button className="btn_halaman" disabled={data.disabled}>
                        {index + 1}
                      </button>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
