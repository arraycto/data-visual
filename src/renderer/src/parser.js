import React from "react";
import cx from "classnames";
import { getField } from "../common/context";

import generator from "./generator";

const GeneratorField = ({ value }) => {
  const { width, height, background, left, top, ...rest } = value.data;
  const className = cx("animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const overwriteStyle = {
    position: "absolute",
    left: left,
    top: top,
    padding: "5px 12px",
    width: width,
    height: height,
    borderColor: "transparent",
    borderWidth: 2,
    borderStyle: "solid",
    background,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = (m) => {
    const prop = getField(value.type);
    return generator(prop)(m);
  };

  return (
    <div style={overwriteStyle} className={className}>
      {getSubField({
        isDevelop: false,
        value: value.data,
        uniqueId: value.uniqueId,
        options: value.data.config
      })}
    </div>
  );
};

const GeneratorWidget = ({ widgets = [] }) => {
  if (widgets.length === 0) return null;
  return widgets.map((prop) => <GeneratorField value={prop} key={prop.uniqueId} />);
};

export default GeneratorWidget;
