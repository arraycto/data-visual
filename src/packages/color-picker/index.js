/* eslint-disable */
import React, { useMemo, useState } from "react";
import ColorPicker from "rc-color-picker";
import { Input } from "antd";
import "rc-color-picker/assets/index.css";

import { HexToRgb, RgbToHex, isRgba } from "@/utils";

const VColor = (props) => {
  const [color, setColor] = useState("");
  const [alpha, setAlpha] = useState(100);
  const { format } = props.schema;

  const onPickerChange = (e) => {
    if (props.disabled || props.readonly) return;
    const rgbaValue = HexToRgb(e.color, e.alpha);
    props.onChange(props.name, rgbaValue);
  };

  const onInputChange = (e) => {
    const value = e.target.value ?? "";
    setAlpha(100);
    props.onChange(props.name, value);
  };

  const curColor = useMemo(() => {
    if (!props.value || props.value === "transparent") {
      setAlpha(100);
      return "";
    }
    if (isRgba(props.value)) {
      const { opacity, color } = RgbToHex(props.value);
      setColor(color);
      setAlpha(opacity);
    }
    return props.value;
  }, [props.value]);

  return (
    <Input
      placeholder="请选择颜色"
      disabled={props.disabled || props.readonly}
      value={curColor}
      allowClear
      onChange={onInputChange}
      addonAfter={
        // eslint-disable-next-line
        <ColorPicker
          type={format}
          animation="slide-up"
          className="gc-color-picker"
          alpha={alpha}
          defaultColor="#ffffff"
          color={color}
          onClose={onPickerChange}
        />
      }
    />
  );
};

export default VColor;
