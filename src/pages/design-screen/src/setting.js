import React, { useMemo, useCallback } from "react";
import { Tabs } from "antd";
import Renderers from "~renderer/factory";

import PageLayout from "./page";
import { useEditorStore, useCompose } from "~renderer/common/hooks";
import { getFieldConf, mergeField, setLevelPath } from "~renderer/utils";
import { screenToSchema } from "../schema";

const { TabPane } = Tabs;

const FieldSetConf = () => {
  const { state, setState } = useEditorStore();
  const { view } = useCompose();

  const field = useMemo(() => {
    if (state.selected !== "-") {
      try {
        // TODO: 获取物料组件配置项
        const currentField = getFieldConf(state.components, state.selected);
        const currentFieldSchema = screenToSchema.find((o) => o.materials === currentField.type).fields;

        return [
          {
            displayName: currentField.type,
            value: currentField.data,
            fields: currentFieldSchema
          }
        ];
      } catch (error) {}
    } else {
      return [];
    }
  }, [state.selected, state.tabsKey]);

  const onValueChange = (value) => {
    let rootValue = { ...value };

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

    let results = mergeField(state.components, state.selected, rootValue, 0);
    setLevelPath(results, null);
    setState({
      components: results
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
                {state.tabsKey === item.key && (
                  <Renderers
                    displayName={m.displayName}
                    schema={item.schema}
                    formData={m.value}
                    onChange={onValueChange}
                  />
                )}
              </TabPane>
            ));
          })}
        </Tabs>
      )}
    </div>
  );
};

export default FieldSetConf;
