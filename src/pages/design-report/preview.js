import React, { Fragment } from "react";
import { AxureGridParser } from "~renderer";

import { useDocumentTitle } from "~renderer/common/hooks";
import storage from "@/utils/storage";

const PanelPreview = () => {
  let schemaConfig = JSON.parse(storage.getSession("schema_grid_config") || {});
  const { backgroundColor, backgroundImage, backgroundOpacity, backgroundBlur } = schemaConfig.page;
  useDocumentTitle(`DataV Pro - ${schemaConfig.page.name || "未命名"}`);

  return (
    <Fragment>
      <div
        className="bg-container"
        style={{
          background: backgroundImage
            ? `url(${backgroundImage}) 0% 0% / 100% 100%`
            : backgroundColor
            ? backgroundColor
            : null,
          filter: `blur(${backgroundBlur}px)`,
          opacity: parseFloat(backgroundOpacity / 10)
        }}
      />
      <AxureGridParser widgets={schemaConfig.components} />
    </Fragment>
  );
};

export default PanelPreview;
