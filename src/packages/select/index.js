import React from "react";
import { Select } from "antd";
import { isEmpty } from "@/utils/helper";

const selectHoc = (SelectComponent) => (props) => {
  const { Option } = SelectComponent;
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { enum: enums, enumNames } = props.schema || {};
  const _values = isEmpty(props.value) ? undefined : props.value;
  const onChange = (value) => props.onChange(props.name, value ?? "");

  return (
    <SelectComponent
      style={{ width: "100%", ...style }}
      {...props.options}
      disabled={props.disabled || props.readonly}
      defaultValue={_values}
      onChange={onChange}
    >
      {(enums || []).map((val, index) => {
        let option = enumNames ? enumNames[index] : val;
        const isHtml = typeof option === "string" && option[0] === "<";
        if (isHtml) {
          option = <span dangerouslySetInnerHTML={{ __html: option }} />;
        }
        return (
          <Option value={val} key={index}>
            {option}
          </Option>
        );
      })}
    </SelectComponent>
  );
};

export default selectHoc(Select);
