import React from "react";
import { InputNumber } from "antd";

const numberHoc = (NumberComponent) => (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { max, min, step } = props.schema;
  let obj = {};
  if (max || max === 0) {
    obj = { max };
  }

  if (min || min === 0) {
    obj = { ...obj, min };
  }

  if (step) {
    obj = { ...obj, step };
  }

  const onChange = (value) => {
    props.onChange(props.name, value);
  };

  return (
    <NumberComponent
      {...obj}
      style={{ width: "100%", ...style }}
      disabled={props.disabled || props.readonly}
      {...props.options}
      value={props.value}
      onChange={onChange}
    />
  );
};

export default numberHoc(InputNumber);
