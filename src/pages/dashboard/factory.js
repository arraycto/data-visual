import React, { useState } from "react";
import { Divider, Button, Col, Row, Card, Tabs } from "antd";
import Renderer from "~renderer/factory";
import { MonacoEditor } from "~components";

const { TabPane } = Tabs;

const schema = {
  type: "object",
  properties: {
    case1: {
      title: "基础控件",
      type: "object",
      displayType: "column",
      labelWidth: 110,
      properties: {
        input: {
          title: "简单输入框",
          type: "string",
          displayType: "row",
          options: {
            placeholder: "请输入"
          }
        },
        textarea: {
          title: "简单文本编辑框",
          type: "string",
          format: "textarea",
          displayType: "row"
        },
        color: {
          title: "颜色选择",
          type: "string",
          format: "color",
          displayType: "row"
        },
        date: {
          title: "日期选择",
          type: "string",
          format: "date",
          displayType: "row",
          options: {
            format: "YYYY/MM/DD"
          }
        },
        image: {
          title: "图片展示",
          type: "string",
          format: "image",
          displayType: "row"
        },
        number1: {
          title: "数字输入框",
          type: "number",
          min: 1,
          max: 1000,
          displayType: "row"
        },
        number2: {
          title: "带滑动条",
          type: "number",
          component: "slider",
          displayType: "row",
          options: {
            hideNumber: true
          }
        },
        switch: {
          title: "开关控制",
          type: "boolean",
          component: "switch",
          displayType: "row"
        },
        dateRange: {
          title: "日期范围",
          type: "range",
          format: "dateTime",
          displayType: "row",
          options: {
            placeholder: ["开始时间", "结束时间"]
          }
        },
        showMore: {
          title: "显示更多",
          type: "boolean",
          component: "switch",
          displayType: "row",
          disabled: "{{rootValue.x1.length > 5}}",
          options: {
            checkedChildren: "开启",
            unCheckedChildren: "关闭"
          }
        },
        x1: {
          title: "输入框",
          type: "string",
          displayType: "row",
          options: {
            allowClear: true,
            placeholder: "尝试输入超过5个字符"
          },
          hidden: (formData, rootValue) => rootValue.showMore === false
        },
        radio1: {
          title: "单选1",
          type: "string",
          component: "radio",
          displayType: "row",
          enum: ["a", "b", "c"],
          enumNames: ["早", "中", "晚"]
        },
        radio2: {
          title: "单选2",
          type: "string",
          component: "radio",
          displayType: "row",
          enum: ["a", "b", "c"],
          enumNames: ["早", "中", "晚"],
          options: { optionType: "button", buttonStyle: "solid" }
        },
        select: {
          title: "带搜索的单选框",
          type: "string",
          displayType: "row",
          enum: ["a", "b", "c"],
          enumNames: ["jack", "steve", "david"],
          hidden: "{{rootValue.showMore === false}}",
          options: {
            filterOption: true,
            showSearch: true,
            optionFilterProp: "children"
          }
        },
        multiSelect: {
          title: "标签模式",
          description: "除了可选的标签，还可输入自定义的标签",
          type: "array",
          displayType: "column",
          hidden: "{{rootValue.showMore === false}}",
          enum: ["旅行达人", "工作狂", "老司机", "小资"],
          component: "select",
          options: {
            mode: "tags"
          }
        },
        multiSelect: {
          title: "标签模式",
          description: "除了可选的标签，还可输入自定义的标签",
          type: "array",
          displayType: "column",
          hidden: "{{rootValue.showMore === false}}",
          enum: ["旅行达人", "工作狂", "老司机", "小资"],
          component: "select",
          options: {
            mode: "tags"
          }
        },
        boxes: {
          title: "多选",
          description: "checkbox",
          type: "array",
          displayType: "row",
          items: {
            type: "string"
          },
          enum: ["A", "B", "C", "D"],
          enumNames: ["杭州", "武汉", "湖州", "贵阳"]
        },
        backgroundImage1: {
          title: "普通上传",
          type: "string",
          format: "upload",
          displayType: "row",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        },
        backgroundImage2: {
          title: "裁剪上传",
          type: "string",
          format: "crop",
          displayType: "row",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        },
        excel: {
          title: "上传excel",
          type: "string",
          format: "excel",
          displayType: "row",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        }
      }
    },
    modal: {
      title: "弹层隐藏部分配置",
      description: "目前支持modal/drawer",
      type: "object",
      displayType: "column",
      labelWidth: 120,
      properties: {
        obj1: {
          title: "object + modal",
          type: "object",
          displayType: "row",
          options: {
            modal: true
          },
          properties: {
            input1: {
              title: "输入框1",
              type: "string"
            },
            input2: {
              title: "输入框2",
              type: "string"
            }
          }
        },
        obj2: {
          title: "object + drawer",
          type: "object",
          displayType: "row",
          options: {
            drawer: {
              width: 350
            }
          },
          properties: {
            input1: {
              title: "输入框1",
              type: "string",
              labelWidth: 80
            },
            input2: {
              title: "输入框2",
              type: "string",
              labelWidth: 80
            }
          }
        }
      }
    }
  }
};

const FormRenderers = () => {
  const [formData, setFormData] = useState({
    case1: {
      input: "",
      textarea: "Hello World!",
      color: "",
      date: "2020/09/20",
      image: "http://placekitten.com/200/200",
      number1: "",
      number2: "",
      switch: true,
      dateRange: null,
      showMore: true,
      x1: "",
      radio1: "a",
      radio2: "a",
      select: "b",
      multiSelect: ["旅行达人", "工作狂"],
      boxes: [],
      backgroundImage1: "",
      backgroundImage2: "",
      excel: ""
    },
    modal: {
      obj1: {
        input1: "",
        input2: ""
      },
      obj2: {
        input1: "",
        input2: ""
      }
    }
  });

  return (
    <div className="gc-page">
      <Divider orientation="left">
        <Button
          type="link"
          target="_blank"
          href="https://x-render.gitee.io/form-render/guide/design#%E6%9E%81%E7%AE%80-api"
        >
          设计理念
        </Button>
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="渲染层">
            <Renderer displayName="page" schema={schema} formData={formData} onChange={setFormData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="数据层">
            <Tabs defaultActiveKey="2">
              <TabPane tab="配置" key="1">
                <MonacoEditor height={770} language="json" value={schema} readOnly />
              </TabPane>
              <TabPane tab="数据" key="2">
                <MonacoEditor height={770} language="json" value={formData} readOnly />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormRenderers;
