import React from "react";
import { Spin } from "antd";
import "./style.less";

const AutoLoading = () => {
  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
};

export default AutoLoading;
