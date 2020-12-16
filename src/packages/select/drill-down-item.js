import React, { useEffect, useRef } from "react";
import { Select } from "antd";
import { cloneDeep } from "lodash";
import collections from "./compoents";
import { guid } from "@/utils";

const drillDownSelectHoc = (SelectComponent) => (props) => {
  const { name, value, onChange, displayName } = props;
  const drillDownList = useRef(collections).current;

  // TODO: 下钻参数处理 redux存储
  const onDrillChange = (val) => {
    let result;
    const values = drillDownList.filter((o) => o.type === val).map((v) => ((v["uniqueId"] = guid()), v));
    result = cloneDeep(values);
    onChange(name, result);
  };

  useEffect(() => {
    console.log("displayName", displayName);
  }, []);

  return (
    <SelectComponent
      style={{ width: "100%" }}
      allowClear={true}
      placeholder="请选择下钻图表"
      value={value.length > 0 ? value[0].type : undefined}
      onChange={onDrillChange}
    >
      {drillDownList.map((item) => {
        return (
          <SelectComponent.Option key={item.type} value={item.type}>
            {item.name}
          </SelectComponent.Option>
        );
      })}
    </SelectComponent>
  );
};

export default drillDownSelectHoc(Select);
