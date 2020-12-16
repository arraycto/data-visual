import React from "react";
import { Select } from "antd";

const multiSelectHoc = (SelectComponent) => (props) => {
  const { Option } = SelectComponent;
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { enum: enums, enumNames } = props.schema || {};
  const _value = props.value && Array.isArray(props.value) ? props.value : [];
  const onChange = (value) => props.onChange(props.name, value);

  return (
    <SelectComponent
      {...props.options}
      style={{ width: "100%", ...style }}
      mode="multiple"
      disabled={props.disabled || props.readonly}
      value={_value}
      onChange={onChange}
    >
      {(enums || []).map((val, index) => (
        <Option value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val
            }}
          />
        </Option>
      ))}
    </SelectComponent>
  );
};

export default multiSelectHoc(Select);
