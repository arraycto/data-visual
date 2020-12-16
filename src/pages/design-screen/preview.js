import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AutonContainer } from "~components";
import { AxureScreenParser } from "~renderer";
import { DIMENSION } from "~renderer/common/constants";
import { useDocumentTitle } from "~renderer/common/hooks";

import storage from "@/utils/storage";

const PanelPreview = (props) => {
  const [fullStyles, setFullStyles] = useState({});
  let schemaConfig = JSON.parse(storage.getSession("schema_screen_config") || {});
  const { pageSize, backgroundColor, backgroundImage, zoom, backgroundOpacity, backgroundBlur } = schemaConfig.page;
  useDocumentTitle(`DataV Pro - ${schemaConfig.page.name || "未命名"}`);

  useEffect(() => {
    props.dispatch({ type: "SET_MODE", data: "preview" });
    setFullStyles({
      position: "relative",
      width: DIMENSION[pageSize].width,
      height: DIMENSION[pageSize].height
    });
  }, []);

  return (
    <AutonContainer style={fullStyles} zoom={zoom}>
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
      <AxureScreenParser widgets={schemaConfig.components} />
    </AutonContainer>
  );
};

export default connect((state) => state.component)(PanelPreview);
