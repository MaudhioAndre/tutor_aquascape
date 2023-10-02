import React from "react";

export default function SidebarHome() {
  return (
    <div className="sidebar_home">
      <div className="div_search_sidebar">
        <div className="txt_search_post">Search Post</div>
        <div className="div_content_search">
          <input className="input_search_post" type="text" />
          <button className="btn_search_post">Search</button>
        </div>
      </div>
      <div className="div_sidebar_ads">
        <center>Advertisement</center>
      </div>
    </div>
  );
}
