/**
 * 下钻模态框组件解析
 */
import React, { useMemo } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { getField } from "../common/context";
import { converLayout } from "../utils";

import generator from "./generator";

import { guid } from "@/utils";

const GeneratorField = ({ mode, value, onRowValueChange }) => {
  const { width, height, background, ...rest } = value.data;

  const classNames = cx("gc-field animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const overwriteStyle = {
    width: mode === "development" ? "100%" : "calc((width || 1) / 12 * 90%)",
    height: converLayout(height),
    borderStyle: rest.borderStyle || "solid",
    borderColor: "transparent",
    background,
    borderRadius: rest.borderRadius,
    borderWidth: rest.borderWidth || 2,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = (m) => {
    const field = getField(value.type);
    return generator(field)(m);
  };

  const fieldProps = useMemo(
    () => ({
      value: value.data,
      uniqueId: guid(),
      options: value.data.config || {},
      onChange: (val, level) => onRowValueChange(val, level)
    }),
    [value.data, onRowValueChange]
  );

  return (
    <div className={classNames} style={overwriteStyle}>
      {getSubField(fieldProps)}
    </div>
  );
};

export default connect((state) => ({
  mode: state.component.mode
}))(GeneratorField);
