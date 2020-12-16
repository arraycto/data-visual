import React from "react";
import { Checkbox } from "antd";

const VCheckbox = (p) => {
  return (
    <Checkbox
      {...p.options}
      disabled={p.disabled || p.readonly}
      onChange={(e) => p.onChange(p.name, e.target.checked)}
      checked={p.value}
    />
  );
};

export default VCheckbox;
