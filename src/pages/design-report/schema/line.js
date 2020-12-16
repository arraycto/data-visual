export default [
  {
    materials: "line",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            remark: {
              title: "图层简介",
              type: "string",
              format: "textarea",
              options: { placeholder: "请输入简介" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", type: "string", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              component: "switch",
              disabled: "{{rootValue.title.length > 5}}",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              component: "switch",
              disabled: "{{rootValue.title.length > 5}}",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      },
      {
        name: "高级",
        key: "setting",
        schema: {
          type: "object",
          properties: {
            config: {
              type: "object",
              title: "高级属性",
              description: "图表组件属性说明",
              displayType: "column",
              properties: {
                unit: {
                  title: "单位",
                  type: "string",
                  options: {
                    allowClear: true,
                    placeholder: "请输入单位"
                  }
                },
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean",
                  component: "switch"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean",
                  component: "switch"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  type: "string",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  type: "string",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  type: "string",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "string",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "string",
                  enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
                }
              }
            }
          }
        }
      },
      {
        name: "数据",
        key: "data",
        schema: {
          type: "object",
          properties: {
            dataConfig: {
              type: "object",
              title: "数据属性相关",
              description: "支持多数据源转换映射",
              displayType: "column",
              component: "dataSource",
              options: {
                height: 300
              }
            }
          }
        }
      },
      {
        name: "下钻",
        key: "drill",
        schema: {
          type: "object",
          properties: {
            drillDownOpen: {
              title: "开启下钻",
              type: "boolean",
              component: "switch"
            },
            drillDown: {
              title: "下钻后展示的图表类型",
              description:
                "在本图表中点击并触发下钻即可编辑下钻图表，传递到下钻图表中的上层图表信息及查询条件可以在下钻图表的控制面板中点击「调试」进行查看。",
              type: "array",
              displayType: "column",
              hidden: "{{rootValue.drillDownOpen == false}}",
              enum: ["旅行达人", "工作狂", "老司机", "小资"],
              component: "select",
              options: {
                mode: "tags"
              }
            }
          }
        }
      },
      {
        name: "联动",
        key: "dependence",
        schema: {
          type: "object",
          properties: {
            dependenceOpen: {
              title: "开启图表联动",
              type: "boolean",
              component: "switch",
              labelWidth: 100
            },
            dependence: {
              title: "请选择与本图表联动的下级图表",
              description:
                "在本图表中点击数据项可触发下级图表联动的更新数据。触发联动后，在下级图表的控制面板中点击「调试」可以查看传递到下级图表的本图表点击数据项的信息。",
              type: "array",
              displayType: "column",
              enum: ["k39qyjq22q3rt", "k382qu3o27kp3"],
              enumNames: ["图例1", "图例2"],
              hidden: "{{rootValue.dependenceOpen === false}}",
              component: "select",
              options: {
                mode: "tags"
              }
            }
          }
        }
      }
    ]
  }
];
