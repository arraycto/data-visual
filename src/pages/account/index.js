/* eslint-disable */
import React from "react";
import { Form, Input, Button, message, Tooltip } from "antd";
import { connect } from "react-redux";

import { IconFont } from "~components";

import { aesEncrypt } from "@/utils";
import { accountIn } from "@/api";
import { useDocumentTitle } from "~renderer/common/hooks";

import "../../styles/account.less";

/**
 * 创建表单回显的对象
 * @param {*} obj
 */
// function createFormField(obj) {
//   let target = {};
//   function isObject(data) {
//     return Object.prototype.toString.call(data) === "[object Object]";
//   }
//   if (isObject(obj)) {
//     for (let [key, value] of Object.entries(obj)) {
//       target[key] = value;
//     }
//   }
//   return target;
// }

const LoginPage = (props) => {
  const [form] = Form.useForm();
  const { dispatch, history } = props;
  useDocumentTitle("DataV Pro 登录");
  /**
   * 登录
   */
  const handleSubmit = async (values) => {
    // 密码加密算法
    const params = {
      username: values.username,
      password: aesEncrypt(values.password)
    };

    const res = await accountIn(params);

    if (res.access_token) {
      dispatch({ type: "ACCESS_TOKEN", data: res.access_token });
      dispatch({ type: "USER_INFO", data: res });
      dispatch({ type: "ROUTER_PATH", data: "/dashboard" });
      message.success("登录成功");
      history.replace("/dashboard");
    } else {
      message.error("登录验证失败");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // 初始化表单
  // useEffect(() => {
  //   form.resetFields();
  //   let value = createFormField({
  //     username: "Super Admin",
  //     password: "111111",
  //   });
  //   form.setFieldsValue(value);
  // }, []);

  return (
    <div
      className="gc-login"
      style={{
        backgroundImage: `url(${require("@/assets/bg.jpg")})`
      }}
    >
      <div className="gc-login__bd">
        <div className="gc-login__title">DataV Pro 实验室</div>
        <div className="gc-login__items">
          <Form
            form={form}
            name="control-hooks"
            initialValues={{
              username: "Super Admin",
              password: "111111"
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
              <Input prefix={<IconFont antd={true} type="UserOutlined" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
              <Input.Password prefix={<IconFont antd={true} type="LockOutlined" />} allowClear={true} />
            </Form.Item>
            <Form.Item>
              <Tooltip placement="right" title="数据基于mockjs开发无需验证，任意帐号体验即可" destroyTooltipOnHide>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Tooltip>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="gc-login__footer">
        <p className="gc-login__footer--copyright">
          Copyright&nbsp;&nbsp;&nbsp;2020 react Admin pro 实验台&nbsp;&nbsp;
          <Button type="link" href="https://github.com/Aaron52077" target="_blank">
            @Aaron
          </Button>
        </p>
        <p className="gc-login__footer--options">
          <Button type="link">帮助</Button>
          <Button type="link">隐私</Button>
          <Button type="link">条款</Button>
        </p>
      </div>
    </div>
  );
};

export default connect((state) => state.app)(LoginPage);
