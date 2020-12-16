import React from "react";
import { InputNumber, Slider } from "antd";
import { isEmpty } from "@/utils/helper";

const SliderWithNumber = (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { max, min, step, disabled = false, readonly = false } = props.schema;
  let setting = {};
  if (max || max === 0) {
    setting = { max };
  }

  if (min || min === 0) {
    setting = { ...setting, min };
  }

  if (step) {
    setting = { ...setting, step };
  }

  let hideNumber = false;
  if (props.options && props.options.hideNumber) {
    hideNumber = true;
  }

  const renderNumber = readonly ? (
    <span style={{ width: "90px" }}>{isEmpty(props.value) ? "-" : props.value}</span>
  ) : (
    <InputNumber
      {...props.options}
      {...setting}
      style={{ width: "90px", ...style }}
      value={props.value}
      disabled={disabled}
      readonly={readonly}
      onChange={onChange}
    />
  );

  const onChange = (value) => {
    props.onChange(props.name, value);
  };

  return (
    <div className="gc-slider">
      <Slider
        style={{ flexGrow: 1, marginRight: hideNumber ? 0 : 12 }}
        {...setting}
        onChange={onChange}
        value={typeof props.value === "number" ? props.value : min || 0}
        disabled={props.disabled || props.readonly}
      />
      {hideNumber ? null : renderNumber}
    </div>
  );
};

export default SliderWithNumber;
