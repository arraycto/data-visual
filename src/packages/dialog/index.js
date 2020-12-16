import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Tabs, Row, Col, Card } from "antd";
import { connect } from "react-redux";
import { Scrollbar } from "~components";
import Renderers from "~renderer/factory";
import { AxureParser } from "~renderer";
import subSchema from "./schema";

// reset form fields when modal is dirlldown, closed
const DialogHoc = (DialogComponent) => (props) => {
  const { visible, value, onCancel, mode } = props;

  const [keys, setKeys] = useState("base");
  const [fields, setFields] = useState([]);
  const isDevelop = mode === "development";
  const calculateWidth = `${(value.data?.width / 12) * 100}%`;

  const modalStyle = {
    maxWidth: "100vw",
    minWidth: 800,
    minHeight: 300,
    paddingBottom: 0
  };

  const onValueChange = useCallback(
    (val) => {
      if (!props.onRowValueChange) return;
      let rootValue = { ...val };

      // 联动、下钻参数变更
      if (val.drillDownOpen) {
        rootValue = {
          ...rootValue,
          dependenceOpen: !val.drillDownOpen
        };
      }

      if (val.dependenceOpen) {
        rootValue = {
          ...rootValue,
          drillDownOpen: !val.dependenceOpen
        };
      }
      props.onRowValueChange(rootValue, value.data.drillDownLevel);
    },
    [props.onRowValueChange]
  );

  useEffect(() => {
    setKeys("base");
  }, [visible]);

  useEffect(() => {
    try {
      // TODO: 获取物料组件配置项
      const currentFieldSchema = subSchema.find((o) => o.materials === value.type).fields;

      setFields([
        {
          displayName: value.type,
          value: value.data,
          field: currentFieldSchema
        }
      ]);
    } catch (error) {
      console.warn(`error message. ${error}`);
    }
  }, [value.uniqueId]);

  return (
    <DialogComponent
      title={value.data.title || "未命名"}
      forceRender={true}
      visible={visible}
      destroyOnClose={true}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        isDevelop
          ? [
              <Button key="back" key="submit" type="primary" onClick={onCancel}>
                确定
              </Button>
            ]
          : null
      }
      width={calculateWidth}
      style={modalStyle}
    >
      <Row>
        {isDevelop ? (
          <>
            <Col span={16} style={{ height: value.data.height || 300 }}>
              <AxureParser value={value} onRowValueChange={props.onRowValueChange} />
            </Col>
            <Col span={8}>
              <Card
                title="控制面板"
                bodyStyle={{
                  padding: "0 15px",
                  fontSize: 12,
                  minHeight: 600
                }}
              >
                <Tabs
                  activeKey={keys}
                  onTabClick={(key) => {
                    setKeys(key);
                  }}
                >
                  {fields.map((m) => {
                    return m.field.map((item) => (
                      <Tabs.TabPane tab={item.name} key={item.key}>
                        <Scrollbar hideHorizontal h={600}>
                          {keys === item.key && (
                            <Renderers
                              displayName={m.displayName}
                              schema={item.schema}
                              formData={m.value}
                              onChange={onValueChange}
                            />
                          )}
                        </Scrollbar>
                      </Tabs.TabPane>
                    ));
                  })}
                </Tabs>
              </Card>
            </Col>
          </>
        ) : (
          <Col span={24}>
            <AxureParser value={value} />
          </Col>
        )}
      </Row>
    </DialogComponent>
  );
};

export default connect((state) => state.component)(DialogHoc(Modal));
