import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Renderers from "~renderer/factory";

import PageLayout from "./page";
import { useEditorStore, useCompose } from "~renderer/common/hooks";
import { getFieldConf, mergeField } from "~renderer/utils";
import { gridToSchema } from "../schema";

const { TabPane } = Tabs;

const FieldSetConf = () => {
  const [field, setField] = useState([]);
  const { state, setState } = useEditorStore();
  const { view } = useCompose();

  useEffect(() => {
    if (state.components.length > 0 && state.selected !== "-") {
      try {
        // TODO: 获取物料组件配置项
        const currentField = getFieldConf(state.components, state.selected);
        const currentFieldSchema = gridToSchema.filter((o) => o.materials === currentField.type)[0].fields;
        setField([
          {
            displayName: currentField.type,
            value: currentField.data,
            fields: currentFieldSchema
          }
        ]);
      } catch (error) {}
    } else {
      setField([]);
    }
    return () => {
      setState({ tabsKey: "base" });
    };
  }, [state.selected]);

  const onValueChange = (value) => {
    let rootValue = { ...value, drillDownLevel: 0 };

    // 联动、下钻参数变更
    if (value.drillDownOpen) {
      rootValue = {
        ...rootValue,
        dependenceOpen: !value.drillDownOpen
      };
    }

    if (value.dependenceOpen) {
      rootValue = {
        ...rootValue,
        drillDownOpen: !value.dependenceOpen
      };
    }

    let result = mergeField(state.components, state.selected, rootValue, 0);
    setState({
      components: result
    });
  };

  return (
    <div className={view.settingCollapsed ? "gc-design__setting is-show" : "gc-design__setting"}>
      {state.selected === "-" ? (
        <PageLayout />
      ) : (
        <Tabs
          className="setting-panel"
          size="large"
          tabPosition="right"
          activeKey={state.tabsKey}
          onTabClick={(key) => {
            setState({ tabsKey: key });
          }}
        >
          {field.map((m) => {
            return m.fields.map((item) => (
              <TabPane tab={item.name} key={item.key}>
                <Renderers
                  displayName={m.displayName}
                  schema={item.schema}
                  formData={m.value}
                  onChange={onValueChange}
                />
              </TabPane>
            ));
          })}
        </Tabs>
      )}
    </div>
  );
};

export default FieldSetConf;
