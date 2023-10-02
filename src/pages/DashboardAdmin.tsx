import React from "react";

import { Helmet } from 'react-helmet-async';

export default function DashboardAdmin() {
  return (
    <>
      <Helmet>
        <title>Dashboard | {window.config.appname}</title>
      </Helmet>
      <div>DashboardAdmin</div>
    </>
  );
}
