import React, { Fragment, useRef, useState, useEffect } from "react";
import { Collapse, Tree, Select, Card, Col, Row } from "antd";
import { IconFont } from "~components";
import { useEditorStore, useCompose } from "~renderer/common/hooks";
import collections from "../data";
import { generatorField } from "~renderer/utils";

/**
 * 配置项汇总
 */
const { collection } = collections;

/**
 * 分类组件栏
 * @param {*} list 组件列表
 */
const SubEnumField = ({ list = [] }) => {
  const { state, setState } = useEditorStore();

  const createField = (v) => {
    try {
      const { components, fieldId } = generatorField(state.components, v);

      setState({
        tabsKey: "base",
        selected: fieldId,
        components: components
      });
    } catch (error) {
      console.log(`组件创建失败，${error}`);
    }
  };

  return (
    <Row gutter={10}>
      {list.map((ele, idx) => {
        return (
          <Col span={12} key={`${idx}`} className="silder-item">
            <Card
              hoverable
              cover={ele.icon ? <img alt="AutoComplete" src={require(`@/assets/${ele.icon}.png`)} /> : null}
              bodyStyle={{
                padding: "10px 5px",
                fontSize: 12
              }}
              onClick={() => {
                createField(ele);
              }}
            >
              <Card.Meta description={ele.name} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

/**
 * 枚举组件
 * @param {*} value 搜索值
 */
const EnumFields = ({ value }) => {
  const componentTools = useRef([
    {
      key: "bar",
      name: "柱状图",
      icon: "BarChartOutlined",
      list: collections.vbar
    },
    {
      key: "line",
      name: "线形图",
      icon: "LineChartOutlined",
      list: collections.vline
    },
    {
      key: "map",
      name: "地图",
      icon: "HeatMapOutlined",
      list: collections.vmap
    },
    {
      key: "datav",
      name: "辅助组件",
      icon: "WindowsOutlined",
      list: collections.vdatav
    }
  ]).current;
  const displayField = collection.filter((ele) => ele.name === value);

  return displayField && displayField.length === 0 ? (
    <div className="silder-tab">
      <Collapse defaultActiveKey="bar" expandIconPosition="right" accordion>
        {componentTools.map((item) => (
          <Collapse.Panel
            header={
              <Fragment>
                <IconFont antd={true} style={{ marginRight: 5 }} type={item.icon} />
                {item.name}
              </Fragment>
            }
            key={item.key}
          >
            <SubEnumField list={item.list} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  ) : (
    <SubEnumField list={displayField} />
  );
};

// 组件市场汇总
const FieldMarkets = () => {
  const [displayName, setdisplayName] = useState("");
  const [layer, setLayer] = useState([
    {
      title: "图层",
      key: "-",
      children: []
    }
  ]);
  const { state, setState } = useEditorStore();
  const { view } = useCompose();

  useEffect(() => {
    let childLayer = state.components.map((m) => {
      return {
        key: m.uniqueId,
        title: m.name,
        isLeaf: true
      };
    });
    // 最终图层面板
    setLayer([
      {
        title: "图层",
        key: "-",
        children: childLayer
      }
    ]);
  }, [state.components]);

  const onChange = (value) => {
    setdisplayName(value);
  };

  const onSelect = (keys) => {
    setState({
      selected: keys.join(""),
      tabsKey: "base"
    });
  };

  return (
    <aside className={view.layerCollapsed ? "gc-design__silder is-show" : "gc-design__silder"}>
      <div className="silder-tree">
        <Card title="图层" bordered={false}>
          <Tree.DirectoryTree
            defaultExpandAll
            expandAction={false}
            selectedKeys={[state.selected]}
            onSelect={onSelect}
            treeData={layer}
          />
        </Card>
      </div>
      <div className="silder-components">
        <Card title={`组件 （当前版本：${view.version}）`} bordered={false}>
          <Select
            className="silder-select"
            showSearch={true}
            allowClear={true}
            placeholder="查找对应组件"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {collection.map((item) => {
              return (
                <Select.Option value={item.name} key={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
          <EnumFields value={displayName} />
        </Card>
      </div>
    </aside>
  );
};

export default FieldMarkets;
