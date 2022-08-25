import React from "react";
import { Outlet } from "react-router-dom";
import PanalOptions from "./Panal options/PanalOptions";

import "./panal.scss";

const Panal = () => {
  return (
    <>
      <div className="panal-container">
        <div className="left panal-options">
          <PanalOptions />
        </div>
        <div className="right panal-views">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Panal;
