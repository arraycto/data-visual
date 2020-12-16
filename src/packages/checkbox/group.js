import React from "react";
import { Checkbox } from "antd";

const VCheckboxes = (p) => {
  const { enum: enums, enumNames } = p.schema || {};
  const _value = p.value && Array.isArray(p.value) ? p.value : [];

  return (
    <Checkbox.Group
      disabled={p.disabled || p.readonly}
      value={_value}
      onChange={(values) => p.onChange(p.name, values)}
    >
      {(enums || [true, false]).map((val, index) => (
        <Checkbox value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export default VCheckboxes;
