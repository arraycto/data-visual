import React, { useMemo, useCallback } from "react";
import { Select } from "antd";
import { useEditorStore } from "@/renderer/common/hooks";

const dependenceSelectHoc = (SelectComponent) => ({ name, value, onChange }) => {
  const { state } = useEditorStore();
  const options = state.components.filter((v) => v.uniqueId !== state.selected && v.data.dependence);

  const rootValue = useMemo(() => {
    return value;
  }, [value]);

  // TODO: 联动参数处理
  const onDependenceChange = useCallback(
    (value) => {
      onChange(name, value);
    },
    [onChange]
  );

  return (
    <SelectComponent
      style={{ width: "100%" }}
      mode="multiple"
      allowClear={true}
      placeholder="请选择联动图表"
      value={rootValue}
      onChange={onDependenceChange}
    >
      {options.length > 0 &&
        options.map((item, index) => {
          return (
            <SelectComponent.Option key={index} value={item.uniqueId}>
              {item.name}
            </SelectComponent.Option>
          );
        })}
    </SelectComponent>
  );
};

export default dependenceSelectHoc(Select);
