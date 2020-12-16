import React, { useRef, useEffect, createContext, useContext, useLayoutEffect } from "react";
import {
  Divider,
  Space,
  Form,
  Input,
  InputNumber,
  Modal,
  Button,
  Avatar,
  Typography,
  Card,
  Col,
  Row,
  Switch,
  Tabs
} from "antd";

import { IconFont, MonacoEditor, watermark } from "~components";
import { useStore } from "~renderer/common/hooks";
import { dataVTableList } from "@/api";

const { TabPane } = Tabs;
// 工具函数使用实例
const Ctx = createContext(() => {});

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 18
  }
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[
            {
              required: true
            }
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DemoModal = ({ setState }) => {
  // 方式1：通过组件参数 visible
  // 方式2：组件状态通过useContext上下文获取
  const { visible } = useContext(Ctx);
  const showUserModal = () => {
    setState({
      visible: true
    });
  };

  const hideUserModal = () => {
    setState({
      visible: false
    });
  };

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === "userForm") {
            const { basicForm } = forms;
            const users = basicForm.getFieldValue("users") || [];
            basicForm.setFieldsValue({
              users: [...users, values]
            });
            setState({
              visible: false
            });
          }
        }}
      >
        <Form {...layout} name="basicForm" onFinish={onFinish}>
          <Form.Item
            name="group"
            label="用户分组"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="用户列表" shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}>
            {({ getFieldValue }) => {
              const users = getFieldValue("users") || [];
              return users.length ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user">
                      <Avatar icon={<IconFont antd={true} type="UserOutlined" />} />
                      {user.name} - {user.age}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <IconFont antd={true} type="SmileOutlined" /> No user yet. )
                </Typography.Text>
              );
            }}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary">
              确认
            </Button>
            <Button
              htmlType="button"
              style={{
                margin: "0 8px"
              }}
              onClick={showUserModal}
            >
              添加用户
            </Button>
          </Form.Item>
        </Form>

        <ModalForm visible={visible} onCancel={hideUserModal} />
      </Form.Provider>
    </>
  );
};

const UtilBus = () => {
  const [state, setState] = useStore({
    visible: false,
    switchMark: false,
    tabKey: "1",
    schema: [],
    mapping: []
  });

  useEffect(() => {
    dataVTableList().then((res) => {
      setState({
        schema: res.data
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (state.switchMark) {
      watermark({
        ratio: 0.1
      });
    }
  }, [state.switchMark]);

  const toggle = () => {
    const results = state.schema[0].data.map((col, i) => {
      let obj = {};
      state.schema.forEach((row) => {
        obj[row.key] = row.data[i] || "";
      });
      return obj;
    });
    setState({
      mapping: results,
      tabKey: "2"
    });
  };

  return (
    <div className="gc-page">
      <Divider orientation="left">
        <Button type="link" target="_blank" href="https://react.docschina.org/docs/hooks-custom.html">
          自定义hooks用例
        </Button>
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="开启水印以及数据映射关系处理" bordered={false}>
            <Tabs
              activeKey={state.tabKey}
              onChange={(key) => {
                setState({
                  tabKey: key
                });
              }}
            >
              <TabPane tab="元数据" key="1">
                <Space style={{ marginBottom: 10 }}>
                  <div>
                    水印开关：
                    <Switch
                      checkedChildren="开启"
                      unCheckedChildren="关闭"
                      checked={state.switchMark}
                      disabled={state.switchMark}
                      onChange={(checked) => {
                        setState({
                          switchMark: checked
                        });
                      }}
                    />
                  </div>
                  <Button onClick={toggle}>映射</Button>
                </Space>
                <MonacoEditor height={550} language="json" value={state.schema} readOnly />
              </TabPane>
              <TabPane tab="映射数据" key="2">
                <MonacoEditor height={550} language="json" value={state.mapping} readOnly />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="useStore（利用reducer特性管理状态存储）" bordered={false}>
            <Ctx.Provider value={state}>
              <DemoModal setState={setState} />
            </Ctx.Provider>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UtilBus;
