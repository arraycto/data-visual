import { FONT_CONF } from "~renderer/common/constants";

const FONT_NAME = FONT_CONF.map((m) => m.label);
const FONT_VALUE = FONT_CONF.map((m) => m.value);

export default [
  {
    text: "轮播表格",
    name: "scrollPanel",
    icon: "tableplay_90b76df",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "scrollPanel",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        index: true,
        columnWidth: [],
        align: ["center"],
        rowNum: 5,
        headerBGC: "#1981f6",
        headerHeight: 45,
        oddRowBGC: "#003B51",
        evenRowBGC: "#0A2732",
        waitTime: 3000,
        index: true,
        indexHeader: "#",
        carousel: "single",
        hoverPause: true
      },
      data: {
        columns: [
          {
            name: "标题A",
            id: "subsys"
          },
          {
            name: "标题B",
            id: "module"
          },
          {
            name: "标题C",
            id: "business"
          },
          {
            name: "标题D",
            id: "name"
          }
        ],
        rows: [
          ["2019-07-01 19:25", "路面危害-松散", "5", "xxxxxxx"],
          ["2019-07-02 17:25", "路面危害-路面油污清理", "13", "xxxxxxx"],
          ["2019-07-03 16:25", "交安设施-交通标志牌结构", "6", "xxxxxxx"],
          ["2019-07-04 15:25", "路基危害-防尘网", "2", "xxxxxxx"],
          ["2019-07-05 14:25", "交安设施-交通标志牌结构", "1", "xxxxxxx"],
          ["2019-07-06 13:25", "路面危害-松散", "3", "xxxxxxx"],
          ["2019-07-07 12:25", "路基危害-防尘网", "4", "xxxxxxx"],
          ["2019-07-08 11:25", "路面危害-路面油污清理", "2", "xxxxxxx"],
          ["2019-07-09 10:25", "交安设施-交通标志牌结构", "5", "xxxxxxx"],
          ["2019-07-10 09:25", "路基危害-防尘网", "3", "xxxxxxx"]
        ]
      }
    },
    setting: {
      options: {
        type: "object",
        properties: {
          carousel: {
            title: "方式",
            type: "string",
            displayType: "inline",
            enum: ["single", "page"],
            enumNames: ["单行滚动", "整页滚动"]
          },
          index: {
            title: "显示行号",
            type: "boolean",
            displayType: "inline",
            component: "switch",
            disabled: true
          },
          indexHeader: {
            title: "行号表头",
            type: "string"
          },
          headerHeight: {
            title: "表头高度",
            type: "number",
            component: "slider",
            min: 30,
            max: 60,
            options: {
              hideNumber: true
            }
          },
          headerBGC: {
            title: "表头背景色",
            type: "string",
            component: "color"
          },
          oddRowBGC: {
            title: "奇数行背景色",
            type: "string",
            component: "color"
          },
          evenRowBGC: {
            title: "偶数行背景色",
            type: "string",
            component: "color"
          },
          rowNum: {
            title: "表行数",
            type: "number",
            options: {
              min: 1,
              max: 10
            }
          },
          waitTime: {
            title: "轮播时间间隔(ms)",
            type: "number",
            options: {
              min: 0,
              step: 1000
            }
          },
          hoverPause: {
            title: "悬浮暂停轮播",
            type: "boolean",
            displayType: "inline",
            component: "switch"
          }
        }
      }
    }
  },
  {
    text: "排名轮播",
    name: "scrollRankPanel",
    icon: "attrtable_2cf0f5e",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "scrollRankPanel",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        align: ["center"],
        rowNum: 5,
        waitTime: 3000,
        carousel: "single",
        sort: true,
        unit: "万元"
      },
      data: {
        data: [
          {
            name: "周口",
            value: 55
          },
          {
            name: "南阳",
            value: 120
          },
          {
            name: "西峡",
            value: 78
          },
          {
            name: "驻马店",
            value: 66
          },
          {
            name: "新乡",
            value: 80
          },
          {
            name: "信阳",
            value: 45
          },
          {
            name: "漯河",
            value: 29
          }
        ]
      }
    },
    setting: {
      unit: {
        title: "单位",
        type: "string",
        displayType: "inline",
        options: {
          allowClear: true
        }
      },
      carousel: {
        title: "方式",
        type: "string",
        displayType: "inline",
        enum: ["single", "page"],
        enumNames: ["单行滚动", "整页滚动"]
      },
      rowNum: {
        title: "表行数",
        type: "number",
        options: {
          min: 1,
          max: 10
        }
      },
      waitTime: {
        title: "轮播时间间隔(ms)",
        type: "number",
        options: {
          min: 0,
          step: 1000
        }
      },
      sort: {
        title: "自动排序",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    }
  },
  {
    text: "核心指标",
    name: "statistic",
    icon: "treemap_07eb65e",
    schema: {
      type: "object",
      width: 400,
      height: 80,
      component: "indicators",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      data: {
        data: [
          {
            name: "访问量",
            value: 17480134
          },
          {
            name: "访问人数",
            value: 2249190
          },
          {
            name: "周活跃数",
            value: 5326784
          },
          {
            name: "月活跃数",
            value: 7326784
          }
        ]
      },
      options: {
        columns: 0,
        cardPadding: 10,
        cardRadius: 10,
        prefix: "",
        suffix: "",
        subFontSize: 14,
        fontSize: 18,
        precision: 0,
        color: "",
        subColor: "",
        fontFamily: "Microsoft Yahei",
        cardBackground: ""
      }
    },
    setting: {
      columns: {
        title: "每行显示个数（0为都在一行内显示）",
        type: "number",
        component: "number",
        min: 0,
        options: {
          placeholder: "请输入每行显示个数"
        }
      },
      cardPadding: {
        title: "卡片间距离",
        type: "number",
        component: "number",
        min: 0,
        options: {
          placeholder: "请输入每行显示个数"
        }
      },
      cardRadius: {
        title: "卡片圆角",
        type: "number",
        component: "number",
        min: 0,
        options: {
          placeholder: "请输入每行显示个数"
        }
      },
      fontFamily: {
        title: "变化率字体",
        type: "string",
        component: "select",
        enum: FONT_VALUE,
        enumNames: FONT_NAME,
        options: {
          placeholder: "根据首字母可检索",
          showSearch: true
        }
      },
      prefix: {
        title: "前缀",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值前缀"
        }
      },
      suffix: {
        title: "后缀",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值后缀"
        }
      },
      precision: {
        title: "精度",
        type: "number",
        component: "number",
        min: 0,
        max: 4
      },
      subFontSize: {
        title: "指标名称字体大小",
        type: "number",
        component: "number",
        min: 12,
        max: 20
      },
      fontSize: {
        title: "指标取值字体大小",
        type: "number",
        component: "number",
        min: 12,
        max: 20
      },
      subColor: {
        title: "指标名称字体颜色",
        type: "string",
        component: "color"
      },
      color: {
        title: "数值文字颜色",
        type: "string",
        component: "color"
      },
      cardBackground: {
        title: "指标背景颜色",
        type: "string",
        component: "color"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 300
        }
      }
    }
  },
  {
    text: "百分比指标",
    name: "statistic",
    icon: "treemap_07eb65e",
    schema: {
      type: "object",
      width: 180,
      height: 80,
      component: "statistic",
      data: {
        value: 66
      },
      options: {
        fontSize: 18,
        numberColor: "#3f8600",
        precision: 0,
        horizontalAlign: "center",
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
        distributed: "horizontal",
        suffix: "%",
        suffixFontFamily: "Microsoft Yahei",
        suffixFontSize: 20,
        suffixMargin: 0,
        suffixColor: "",
        prefix: "",
        prefixFontFamily: "Microsoft Yahei",
        prefixFontSize: 14,
        prefixMargin: 0,
        prefixColor: "",
        divide: true,
        forceShowPlus: true,
        tendency: "up"
      }
    },
    setting: {
      distributed: {
        title: "前缀与后缀排列形式",
        type: "string",
        component: "radio",
        enum: ["horizontal", "vertical"],
        enumNames: ["水平", "垂直"]
      },
      horizontalAlign: {
        title: "水平对齐",
        type: "string",
        component: "select",
        enum: ["flex-start", "center", "flex-end"],
        enumNames: ["居左", "居中", "居右"]
      },
      fontFamily: {
        title: "数值字体",
        type: "string",
        component: "select",
        enum: FONT_VALUE,
        enumNames: FONT_NAME,
        options: {
          placeholder: "根据首字母可检索",
          showSearch: true
        }
      },
      fontSize: {
        title: "数值大小",
        type: "number",
        component: "number",
        min: 12,
        max: 64,
        options: {
          allowClear: true,
          placeholder: "请输入数值精度"
        }
      },
      numberColor: {
        title: "数值文字颜色",
        type: "string",
        component: "color"
      },
      fontWeight: {
        title: "数值文字粗细",
        type: "string",
        component: "select",
        enum: ["normal", "bold", "bolder", "lighter"]
      },
      precision: {
        title: "精度",
        type: "number",
        component: "number",
        min: 0,
        max: 4,
        options: {
          allowClear: true,
          placeholder: "请输入数值精度"
        }
      },
      tendency: {
        title: "指标调整",
        type: "string",
        component: "select",
        enum: ["up", "down"],
        enumNames: ["上升", "下降"]
      },
      divide: {
        title: "千位分隔符",
        type: "boolean",
        component: "switch",
        displayType: "inline",
        labelWidth: 120
      },
      forceShowPlus: {
        title: "强制显示正负号",
        type: "boolean",
        component: "switch",
        displayType: "inline",
        labelWidth: 120
      },
      prefix: {
        title: "前缀内容",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值前缀"
        }
      },
      prefixFontFamily: {
        title: "前缀字体",
        type: "string",
        component: "select",
        enum: FONT_VALUE,
        enumNames: FONT_NAME,
        options: {
          placeholder: "根据首字母可检索",
          showSearch: true
        }
      },
      prefixFontSize: {
        title: "前缀字体大小",
        type: "number",
        component: "number",
        min: 12,
        max: 64,
        options: {
          allowClear: true,
          placeholder: "请输入前缀字体大小"
        }
      },
      prefixColor: {
        title: "前缀文字颜色",
        type: "string",
        component: "color"
      },
      prefixMargin: {
        title: "前缀与主体距离",
        type: "number",
        component: "slider",
        min: 0,
        max: 100,
        options: {
          hideNumber: true
        }
      },
      suffix: {
        title: "后缀内容",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值后缀"
        }
      },
      suffixFontFamily: {
        title: "后缀字体",
        type: "string",
        component: "select",
        enum: FONT_VALUE,
        enumNames: FONT_NAME,
        options: {
          placeholder: "根据首字母可检索",
          showSearch: true
        }
      },
      suffixFontSize: {
        title: "后缀字体大小",
        type: "number",
        component: "number",
        min: 12,
        max: 64,
        options: {
          allowClear: true,
          placeholder: "请输入后缀字体大小"
        }
      },
      suffixColor: {
        title: "后缀文字颜色",
        type: "string",
        component: "color"
      },
      suffixMargin: {
        title: "后缀与主体距离",
        type: "number",
        component: "slider",
        min: 0,
        max: 100,
        options: {
          hideNumber: true
        }
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 300
        }
      }
    }
  },
  {
    text: "倒计时",
    name: "digitalFlop",
    icon: "treemap_07eb65e",
    schema: {
      type: "object",
      width: 240,
      height: 100,
      component: "countdown",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      data: {
        value: ""
      },
      config: {
        prefix: "",
        suffix: "",
        fontSize: 18,
        precision: 0,
        color: "",
        fontFamily: "Microsoft Yahei",
        format: "D 天 H 时 m 分 s 秒"
      }
    },
    setting: {
      fontFamily: {
        title: "字体",
        type: "string",
        component: "select",
        enum: FONT_VALUE,
        enumNames: FONT_NAME,
        options: {
          placeholder: "根据首字母可检索",
          showSearch: true
        }
      },
      format: {
        title: "展示形式",
        type: "string",
        component: "select",
        enum: ["HH:mm:ss", "D 天 H 时 m 分 s 秒"],
        enumNames: ["纯数字", "数字 + 文字"]
      },
      prefix: {
        title: "前缀",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值前缀"
        }
      },
      suffix: {
        title: "后缀",
        type: "string",
        options: {
          allowClear: true,
          placeholder: "请输入数值后缀"
        }
      },
      precision: {
        title: "精度",
        type: "number",
        component: "number",
        min: 0,
        max: 4,
        options: {
          allowClear: true,
          placeholder: "请输入数值精度"
        }
      },
      fontSize: {
        title: "数值文字大小",
        type: "number",
        component: "number",
        min: 12,
        max: 64
      },
      color: {
        title: "数值文字颜色",
        type: "string",
        component: "color"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 300
        }
      }
    }
  },
  {
    text: "装饰",
    name: "decoration",
    icon: "bubble_64a963b",
    schema: {
      type: "object",
      width: 150,
      height: 150,
      component: "decoration"
    }
  },
  {
    text: "边框1",
    name: "borderBoxA",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxA"
    }
  },
  {
    text: "边框2",
    name: "borderBoxB",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxB",
      options: {
        reverse: false
      }
    },
    setting: {
      reverse: {
        title: "翻转",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    }
  },
  {
    text: "边框3",
    name: "borderBoxC",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxC",
      options: {
        reverse: false
      }
    },
    setting: {
      reverse: {
        title: "翻转",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    }
  },
  {
    text: "边框4",
    name: "borderBoxD",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxD",
      options: {
        reverse: false,
        waitTime: 3
      }
    },
    setting: {
      reverse: {
        title: "翻转",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      },
      waitTime: {
        title: "单次动画时长(秒)",
        type: "number",
        options: {
          min: 1,
          max: 10
        }
      }
    }
  },
  {
    text: "边框5",
    name: "borderBoxE",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxE"
    }
  },
  {
    text: "边框6",
    name: "borderBoxF",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxF"
    }
  },
  {
    text: "边框7",
    name: "borderBoxG",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxG",
      options: {
        title: "驾驶舱",
        titleWidth: 250
      }
    },
    setting: {
      title: {
        title: "边框标题",
        type: "string"
      },
      titleWidth: {
        title: "标题宽度",
        type: "number",
        options: {
          min: 1,
          max: 250
        }
      }
    }
  },
  {
    text: "边框8",
    name: "borderBoxH",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxH"
    }
  },
  {
    text: "边框9",
    name: "borderBoxI",
    icon: "borderimage_45fc471",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "borderBoxI"
    }
  }
];
