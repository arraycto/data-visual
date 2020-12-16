const otherConfig = [
  {
    text: "漏斗图",
    name: "funnel",
    icon: "funnel_00f5101",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "funnel",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "人",
        sortType: "descending",
        funnelWidth: "80%"
      },
      data: {
        series: [
          { value: 60, name: "访问" },
          { value: 40, name: "咨询" },
          { value: 20, name: "订单" },
          { value: 80, name: "点击" },
          { value: 100, name: "展现" }
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
      sortType: {
        title: "方向",
        type: "string",
        displayType: "inline",
        component: "radio",
        enum: ["ascending", "descending"],
        enumNames: ["朝上", "朝下"]
      },
      funnelWidth: {
        title: "漏斗宽度占比",
        type: "string",
        enum: ["80%", "70%", "60%", "50%"]
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  {
    text: "雷达图",
    name: "radar",
    icon: "radar_1481bc4",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "radar",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        legendShow: false,
        stack: false
      },
      data: {
        indicators: [
          {
            text: "语文",
            max: 100
          },
          {
            text: "数学",
            max: 100
          },
          {
            text: "历史",
            max: 100
          },
          {
            text: "地理",
            max: 100
          },
          {
            text: "生物",
            max: 100,
            min: 60
          }
        ],
        series: [
          {
            name: "学生A",
            value: [96, 53, 95, 85, 92]
          },
          {
            name: "学生B",
            value: [94, 82, 74, 83, 77]
          }
        ]
      }
    },
    setting: {
      legendShow: {
        title: "显示图例",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      },
      stack: {
        title: "雷达填充颜色",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  {
    text: "散点图",
    name: "scatter",
    icon: "scatter_d6f85f3",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "scatter",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "台",
        symbol: "circle"
      },
      data: {
        categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
        series: [
          {
            name: "旺季",
            data: [
              {
                name: "苹果",
                data: [11180, 20390, 20269]
              },
              {
                name: "三星",
                data: [22769, 22601]
              },
              {
                name: "华为",
                data: [23037, 12727]
              },
              {
                name: "oppo",
                data: [6995, 5365, 5230, 7621]
              },
              {
                name: "vivo",
                data: [19303, 15742, 23131, 19689]
              },
              {
                name: "小米",
                data: [1040, 1216, 1195, 1163]
              }
            ]
          },
          {
            name: "淡季",
            data: [
              {
                name: "苹果",
                data: [2437, 2453, 1743, 1963, 2220]
              },
              {
                name: "三星",
                data: [1909, 1498, 2287]
              },
              {
                name: "华为",
                data: [1226, 1502, 1202, 2263]
              },
              {
                name: "oppo",
                data: [397, 808, 2038, 1791, 1309]
              },
              {
                name: "vivo",
                data: [2302, 1944, 2222, 2079]
              },
              {
                name: "小米",
                data: [1950, 918, 2301]
              }
            ]
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
      symbol: {
        title: "标记类型",
        type: "string",
        enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  // {
  //   text: "环形柱状图",
  //   name: "barPolar",
  //   icon: "barpolar_03a2c64",
  //   schema: {
  //     type: "object",
  //     width: 400,
  //     height: 250,
  //     component: "barPolar",
  //     dataType: "json",
  //     dataSqlId: "",
  //     dataSqlConfig: "",
  //     dataApiUrl: "",
  //     dataApiConfig: "",
  //     isRefresh: true,
  //     refreshTime: 1800,
  //     options: {
  //       unit: "个",
  //       barWidth: 20,
  //       angleAxis: false,
  //       splitLine: true,
  //       pointerLine: true,
  //       pointerLineColor: "#dee1ec"
  //     },
  //     data: {
  //       categories: ["周一", "周二", "周三", "周四"],
  //       series: [
  //         {
  //           data: [100, 600, 600, 400]
  //         },
  //         {
  //           data: [400, 600, 200, 100]
  //         }
  //       ]
  //     }
  //   },
  //   setting: {
  //     unit: {
  //       title: "单位",
  //       type: "string",
  //       displayType: "inline",
  //       options: {
  //         allowClear: true
  //       }
  //     },
  //     angleAxis: {
  //       title: "极坐标系的角度轴",
  //       type: "boolean",
  //       displayType: "inline",
  //       component: "switch"
  //     },
  //     pointerLine: {
  //       title: "移入线形",
  //       type: "boolean",
  //       displayType: "inline",
  //       component: "switch"
  //     },
  //     splitLine: {
  //       title: "分隔线",
  //       type: "boolean",
  //       displayType: "inline",
  //       component: "switch"
  //     },
  //     pointerLineColor: {
  //       title: "移入线形颜色",
  //       type: "string",
  //       component: "color"
  //     },
  //     barWidth: {
  //       title: "柱条的宽度",
  //       type: "number",
  //       component: "slider",
  //       min: 10,
  //       max: 50,
  //       options: {
  //         hideNumber: true
  //       }
  //     }
  //   },
  //   database: {
  //     data: {
  //       type: "object",
  //       component: "dataSource",
  //       options: {
  //         height: 600
  //       }
  //     }
  //   }
  // },
  {
    text: "矩形占比图",
    name: "treemap",
    icon: "treemap_07eb65e",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "treemap",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "个",
        borderWidth: 2,
        hoverBackColor: "rgba(255,255,255,0.8)",
        borderColor: "rgba(92,121,255,0.8)",
        textColor: "rgba(255,255,255,0.8)",
        hoverTextColor: "rgba(92,121,255,0.8)",
        textSize: 14
      },
      data: {
        series: [
          {
            name: "1920*1080",
            value: 100
          },
          {
            name: "其他",
            value: 40
          },
          {
            name: "1366x768",
            value: 30
          },
          {
            name: "1440x900",
            value: 25
          },
          {
            name: "1600x900",
            value: 15
          },
          {
            name: "1536x864",
            value: 10
          },
          {
            name: "768x1024",
            value: 12
          },
          {
            name: "1024x768",
            value: 14
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
      borderWidth: {
        title: "边界宽度",
        type: "number",
        component: "slider",
        min: 1,
        max: 10,
        options: {
          hideNumber: true
        }
      },
      borderColor: {
        title: "边界颜色",
        type: "string",
        component: "color"
      },
      textColor: {
        title: "文字颜色",
        type: "string",
        component: "color"
      },
      textSize: {
        title: "文字大小",
        type: "number",
        component: "slider",
        min: 12,
        max: 20,
        options: {
          hideNumber: true
        }
      },
      hoverTextColor: {
        title: "移入文字颜色",
        type: "string",
        component: "color"
      },
      hoverBackColor: {
        title: "移入背景色",
        type: "string",
        component: "color"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  {
    text: "桑基图",
    icon: "sankey_8ebc1e0",
    name: "sankey",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "sankey",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "个",
        curveness: 5,
        sortType: "horizontal",
        textColor: "#ffffff",
        textSize: 14
      },
      data: {
        series: {
          data: [
            { name: "数据a" },
            { name: "数据b" },
            { name: "数据a1" },
            { name: "数据b1" },
            { name: "数据c" },
            { name: "数据e" }
          ],
          links: [
            { source: "数据a", target: "数据a1", value: 5 },
            { source: "数据e", target: "数据b", value: 3 },
            { source: "数据a", target: "数据b1", value: 3 },
            { source: "数据b1", target: "数据a1", value: 1 },
            { source: "数据b1", target: "数据c", value: 2 },
            { source: "数据b", target: "数据c", value: 1 }
          ]
        }
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
      sortType: {
        title: "方向",
        type: "string",
        displayType: "inline",
        component: "radio",
        enum: ["horizontal", "vertical"],
        enumNames: ["横向", "纵向"]
      },
      textColor: {
        title: "文字颜色",
        type: "string",
        component: "color"
      },
      textSize: {
        title: "文字大小",
        type: "number",
        component: "slider",
        min: 12,
        max: 20,
        options: {
          hideNumber: true
        }
      },
      curveness: {
        title: "曲线弯曲度",
        type: "number",
        component: "slider",
        min: 0,
        max: 10,
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
          height: 600
        }
      }
    }
  },
  {
    text: "仪表盘",
    name: "gauge",
    icon: "gauge_ad67268",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "gauge",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "%",
        titleFontSize: 20,
        titleColor: "#ffffff",
        detailColor: "#ffffff",
        axisLabelColor: "#ffffff",
        indexFontSize: 20,
        indexColor: "#C23531",
        axisLabelShow: true,
        axisLabelFont: 12
      },
      data: {
        series: {
          max: 100,
          min: 0,
          name: "完成率",
          value: 49.1,
          hideName: false
        }
      }
    },
    setting: {
      titleFontSize: {
        title: "标题字号",
        type: "number",
        component: "number",
        min: 12,
        max: 50
      },
      titleColor: {
        title: "标题颜色",
        type: "string",
        component: "color"
      },
      indexFontSize: {
        title: "指标字号",
        type: "number",
        component: "number",
        min: 12,
        max: 50
      },
      detailColor: {
        title: "指标字号颜色",
        type: "string",
        component: "color"
      },
      axisLabelColor: {
        title: "刻度字号颜色",
        type: "string",
        component: "color"
      },
      axisLabelFont: {
        title: "刻度大小",
        type: "number",
        component: "slider",
        min: 12,
        max: 26,
        options: {
          hideNumber: true
        }
      },
      axisLabelShow: {
        title: "隐藏刻度值",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  {
    text: "水球图",
    name: "liquidfill",
    icon: "liquid-fill_8ed56e3",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "liquidfill",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        backgroundColor: "#E3F7FF",
        borderHied: true,
        borderColor: "#294D99",
        borderWidth: 4,
        borderPadding: 5,
        sumfontSize: 30,
        waveAnimation: true,
        colorRipple: "",
        numberFill: 4,
        shape: "circle"
      },
      data: {
        series: 0.7
      }
    },
    setting: {
      waveAnimation: {
        title: "波浪动画",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      },
      borderHied: {
        title: "显示边框",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      },
      backgroundColor: {
        title: "水球背景颜色",
        type: "string",
        component: "color"
      },
      colorRipple: {
        title: "首层水波浪颜色",
        type: "string",
        component: "color"
      },
      numberFill: {
        title: "最多波浪层数",
        type: "number",
        component: "number",
        min: 1,
        max: 10
      },
      shape: {
        title: "图表形状",
        type: "string",
        enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
      },
      sumfontSize: {
        title: "标签字号",
        type: "number",
        component: "number",
        min: 12,
        max: 80
      },
      borderColor: {
        title: "边框颜色",
        type: "string",
        component: "color"
      },
      borderWidth: {
        title: "边框宽度",
        type: "number",
        component: "slider",
        min: 0,
        max: 15,
        options: {
          hideNumber: true
        }
      },
      borderPadding: {
        title: "边框距离内圆距离",
        type: "number",
        component: "slider",
        min: 0,
        max: 25,
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
          height: 600
        }
      }
    }
  },
  {
    text: "词云图",
    name: "wordCloud",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "wordCloud",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        backgroundColor: "#E3F7FF",
        fontPadding: 8,
        fontRotate: true,
        minFontSize: 12,
        maxFontSize: 35,
        shape: "circle",
        gridSize: 5,
        rotationStep: true,
        unit: ""
      },
      data: {
        series: [
          {
            name: "visualMap",
            value: 22199,
            url: ""
          },
          {
            name: "continuous",
            value: 10288,
            url: ""
          },
          {
            name: "contoller",
            value: 620,
            url: ""
          },
          {
            name: "series",
            value: 274470,
            url: ""
          },
          {
            name: "gauge",
            value: 12311,
            url: ""
          },
          {
            name: "detail",
            value: 1206,
            url: ""
          },
          {
            name: "piecewise",
            value: 4885,
            url: ""
          },
          {
            name: "textStyle",
            value: 32294,
            url: ""
          },
          {
            name: "markPoint",
            value: 18574,
            url: ""
          },
          {
            name: "pie",
            value: 38929,
            url: ""
          },
          {
            name: "roseType",
            value: 969,
            url: ""
          },
          {
            name: "label",
            value: 37517,
            url: ""
          },
          {
            name: "emphasis",
            value: 12053,
            url: ""
          },
          {
            name: "yAxis",
            value: 57299,
            url: ""
          },
          {
            name: "name",
            value: 15418,
            url: ""
          },
          {
            name: "type",
            value: 22905,
            url: ""
          },
          {
            name: "gridIndex",
            value: 5146,
            url: ""
          },
          {
            name: "normal",
            value: 49487,
            url: ""
          },
          {
            name: "itemStyle",
            value: 33837,
            url: ""
          },
          {
            name: "min",
            value: 4500,
            url: ""
          },
          {
            name: "silent",
            value: 5744,
            url: ""
          },
          {
            name: "animation",
            value: 4840,
            url: ""
          },
          {
            name: "offsetCenter",
            value: 232,
            url: ""
          },
          {
            name: "inverse",
            value: 3706,
            url: ""
          },
          {
            name: "borderColor",
            value: 4812,
            url: ""
          },
          {
            name: "markLine",
            value: 16578,
            url: ""
          },
          {
            name: "line",
            value: 76970,
            url: ""
          },
          {
            name: "radiusAxis",
            value: 6704,
            url: ""
          },
          {
            name: "radar",
            value: 15964,
            url: ""
          },
          {
            name: "data",
            value: 60679,
            url: ""
          },
          {
            name: "dataZoom",
            value: 24347,
            url: ""
          },
          {
            name: "tooltip",
            value: 43420,
            url: ""
          },
          {
            name: "toolbox",
            value: 25222,
            url: ""
          },
          {
            name: "geo",
            value: 16904,
            url: ""
          },
          {
            name: "parallelAxis",
            value: 4029,
            url: ""
          },
          {
            name: "parallel",
            value: 5319,
            url: ""
          },
          {
            name: "max",
            value: 3393,
            url: ""
          },
          {
            name: "bar",
            value: 43066,
            url: ""
          },
          {
            name: "heatmap",
            value: 3110,
            url: ""
          },
          {
            name: "map",
            value: 20285,
            url: ""
          },
          {
            name: "animationDuration",
            value: 3425,
            url: ""
          },
          {
            name: "animationDelay",
            value: 2431,
            url: ""
          },
          {
            name: "splitNumber",
            value: 5175,
            url: ""
          },
          {
            name: "axisLine",
            value: 12738,
            url: ""
          },
          {
            name: "lineStyle",
            value: 19601,
            url: ""
          },
          {
            name: "splitLine",
            value: 7133,
            url: ""
          },
          {
            name: "axisTick",
            value: 8831,
            url: ""
          },
          {
            name: "axisLabel",
            value: 17516,
            url: ""
          },
          {
            name: "pointer",
            value: 590,
            url: ""
          },
          {
            name: "color",
            value: 23426,
            url: ""
          },
          {
            name: "title",
            value: 38497,
            url: ""
          },
          {
            name: "formatter",
            value: 15214,
            url: ""
          },
          {
            name: "slider",
            value: 7236,
            url: ""
          },
          {
            name: "legend",
            value: 66514,
            url: ""
          },
          {
            name: "grid",
            value: 28516,
            url: ""
          },
          {
            name: "smooth",
            value: 1295,
            url: ""
          },
          {
            name: "smoothMonotone",
            value: 696,
            url: ""
          },
          {
            name: "sampling",
            value: 757,
            url: ""
          },
          {
            name: "feature",
            value: 12815,
            url: ""
          },
          {
            name: "saveAsImage",
            value: 2616,
            url: ""
          },
          {
            name: "polar",
            value: 6279,
            url: ""
          },
          {
            name: "calculable",
            value: 879,
            url: ""
          },
          {
            name: "backgroundColor",
            value: 9419,
            url: ""
          },
          {
            name: "excludeComponents",
            value: 130,
            url: ""
          },
          {
            name: "show",
            value: 20620,
            url: ""
          },
          {
            name: "text",
            value: 2592,
            url: ""
          },
          {
            name: "icon",
            value: 2782,
            url: ""
          },
          {
            name: "dimension",
            value: 478,
            url: ""
          },
          {
            name: "inRange",
            value: 1060,
            url: ""
          },
          {
            name: "animationEasing",
            value: 2983,
            url: ""
          },
          {
            name: "animationDurationUpdate",
            value: 2259,
            url: ""
          },
          {
            name: "animationDelayUpdate",
            value: 2236,
            url: ""
          },
          {
            name: "animationEasingUpdate",
            value: 2213,
            url: ""
          },
          {
            name: "xAxis",
            value: 89459,
            url: ""
          },
          {
            name: "angleAxis",
            value: 5469,
            url: ""
          },
          {
            name: "showTitle",
            value: 484,
            url: ""
          },
          {
            name: "dataView",
            value: 2754,
            url: ""
          },
          {
            name: "restore",
            value: 932,
            url: ""
          },
          {
            name: "timeline",
            value: 10104,
            url: ""
          },
          {
            name: "range",
            value: 477,
            url: ""
          },
          {
            name: "value",
            value: 5732,
            url: ""
          },
          {
            name: "precision",
            value: 878,
            url: ""
          },
          {
            name: "target",
            value: 1433,
            url: ""
          },
          {
            name: "zlevel",
            value: 5361,
            url: ""
          },
          {
            name: "symbol",
            value: 8718,
            url: ""
          },
          {
            name: "interval",
            value: 7964,
            url: ""
          },
          {
            name: "symbolSize",
            value: 5600,
            url: ""
          },
          {
            name: "showSymbol",
            value: 1247,
            url: ""
          },
          {
            name: "inside",
            value: 8913,
            url: ""
          },
          {
            name: "xAxisIndex",
            value: 3843,
            url: ""
          },
          {
            name: "orient",
            value: 4205,
            url: ""
          },
          {
            name: "boundaryGap",
            value: 5073,
            url: ""
          },
          {
            name: "nameGap",
            value: 4896,
            url: ""
          },
          {
            name: "zoomLock",
            value: 571,
            url: ""
          },
          {
            name: "hoverAnimation",
            value: 2307,
            url: ""
          },
          {
            name: "legendHoverLink",
            value: 3553,
            url: ""
          },
          {
            name: "stack",
            value: 2907,
            url: ""
          },
          {
            name: "throttle",
            value: 466,
            url: ""
          },
          {
            name: "connectNulls",
            value: 897,
            url: ""
          },
          {
            name: "clipOverflow",
            value: 826,
            url: ""
          },
          {
            name: "startValue",
            value: 551,
            url: ""
          },
          {
            name: "minInterval",
            value: 3292,
            url: ""
          },
          {
            name: "opacity",
            value: 3097,
            url: ""
          },
          {
            name: "splitArea",
            value: 4775,
            url: ""
          },
          {
            name: "filterMode",
            value: 635,
            url: ""
          },
          {
            name: "end",
            value: 409,
            url: ""
          },
          {
            name: "left",
            value: 6475,
            url: ""
          },
          {
            name: "funnel",
            value: 2238,
            url: ""
          },
          {
            name: "lines",
            value: 6403,
            url: ""
          },
          {
            name: "baseline",
            value: 431,
            url: ""
          },
          {
            name: "align",
            value: 2608,
            url: ""
          },
          {
            name: "coord",
            value: 897,
            url: ""
          },
          {
            name: "nameTextStyle",
            value: 7477,
            url: ""
          },
          {
            name: "width",
            value: 4338,
            url: ""
          },
          {
            name: "shadowBlur",
            value: 4493,
            url: ""
          },
          {
            name: "effect",
            value: 929,
            url: ""
          },
          {
            name: "period",
            value: 225,
            url: ""
          },
          {
            name: "areaColor",
            value: 631,
            url: ""
          },
          {
            name: "borderWidth",
            value: 3654,
            url: ""
          },
          {
            name: "nameLocation",
            value: 4418,
            url: ""
          },
          {
            name: "position",
            value: 11723,
            url: ""
          },
          {
            name: "containLabel",
            value: 1701,
            url: ""
          },
          {
            name: "scatter",
            value: 10718,
            url: ""
          },
          {
            name: "areaStyle",
            value: 5310,
            url: ""
          },
          {
            name: "scale",
            value: 3859,
            url: ""
          },
          {
            name: "pieces",
            value: 414,
            url: ""
          },
          {
            name: "categories",
            value: 1000,
            url: ""
          },
          {
            name: "selectedMode",
            value: 3825,
            url: ""
          },
          {
            name: "itemSymbol",
            value: 273,
            url: ""
          },
          {
            name: "effectScatter",
            value: 7147,
            url: ""
          },
          {
            name: "fontStyle",
            value: 3376,
            url: ""
          },
          {
            name: "fontSize",
            value: 3386,
            url: ""
          },
          {
            name: "margin",
            value: 1034,
            url: ""
          },
          {
            name: "iconStyle",
            value: 2257,
            url: ""
          },
          {
            name: "link",
            value: 1366,
            url: ""
          },
          {
            name: "axisPointer",
            value: 5245,
            url: ""
          },
          {
            name: "showDelay",
            value: 896,
            url: ""
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
      shape: {
        title: "图表形状",
        type: "string",
        enum: ["circle", "cardioid", "diamond", "triangle-forward", "triangle", "star"],
        enumNames: ["圆形", "心形", "菱形", "正三角", "倒三角", "五角星"]
      },
      minFontSize: {
        title: "最小字体",
        type: "number",
        component: "number",
        min: 12,
        max: 80
      },
      maxFontSize: {
        title: "最大字体",
        type: "number",
        component: "number",
        min: 12,
        max: 80
      },
      gridSize: {
        title: "字符间距",
        type: "number",
        component: "slider",
        min: 1,
        max: 25,
        options: {
          hideNumber: true
        }
      },
      rotationStep: {
        title: "允许文字旋转",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    },
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  },
  {
    text: "坐标热力图",
    name: "heatmap",
    icon: "cartesian-heatmap_4e1c31b",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "heatmap",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {},
      data: {
        series: {
          hours: [
            "12a",
            "1a",
            "2a",
            "3a",
            "4a",
            "5a",
            "6a",
            "7a",
            "8a",
            "9a",
            "10a",
            "11a",
            "12p",
            "1p",
            "2p",
            "3p",
            "4p",
            "5p",
            "6p",
            "7p",
            "8p",
            "9p",
            "10p",
            "11p"
          ],
          days: ["周日", "周六", "周五", "周四", "周三", "周二", "周一"],
          data: [
            [0, 0, 5],
            [0, 1, 1],
            [0, 2, 0],
            [0, 3, 0],
            [0, 4, 0],
            [0, 5, 0],
            [0, 6, 0],
            [0, 7, 0],
            [0, 8, 0],
            [0, 9, 0],
            [0, 10, 0],
            [0, 11, 2],
            [0, 12, 4],
            [0, 13, 1],
            [0, 14, 1],
            [0, 15, 3],
            [0, 16, 4],
            [0, 17, 6],
            [0, 18, 4],
            [0, 19, 4],
            [0, 20, 3],
            [0, 21, 3],
            [0, 22, 2],
            [0, 23, 5],
            [1, 0, 7],
            [1, 1, 0],
            [1, 2, 0],
            [1, 3, 0],
            [1, 4, 0],
            [1, 5, 0],
            [1, 6, 0],
            [1, 7, 0],
            [1, 8, 0],
            [1, 9, 0],
            [1, 10, 5],
            [1, 11, 2],
            [1, 12, 2],
            [1, 13, 6],
            [1, 14, 9],
            [1, 15, 11],
            [1, 16, 6],
            [1, 17, 7],
            [1, 18, 8],
            [1, 19, 12],
            [1, 20, 5],
            [1, 21, 5],
            [1, 22, 7],
            [1, 23, 2],
            [2, 0, 1],
            [2, 1, 1],
            [2, 2, 0],
            [2, 3, 0],
            [2, 4, 0],
            [2, 5, 0],
            [2, 6, 0],
            [2, 7, 0],
            [2, 8, 0],
            [2, 9, 0],
            [2, 10, 3],
            [2, 11, 2],
            [2, 12, 1],
            [2, 13, 9],
            [2, 14, 8],
            [2, 15, 10],
            [2, 16, 6],
            [2, 17, 5],
            [2, 18, 5],
            [2, 19, 5],
            [2, 20, 7],
            [2, 21, 4],
            [2, 22, 2],
            [2, 23, 4],
            [3, 0, 7],
            [3, 1, 3],
            [3, 2, 0],
            [3, 3, 0],
            [3, 4, 0],
            [3, 5, 0],
            [3, 6, 0],
            [3, 7, 0],
            [3, 8, 1],
            [3, 9, 0],
            [3, 10, 5],
            [3, 11, 4],
            [3, 12, 7],
            [3, 13, 14],
            [3, 14, 13],
            [3, 15, 12],
            [3, 16, 9],
            [3, 17, 5],
            [3, 18, 5],
            [3, 19, 10],
            [3, 20, 6],
            [3, 21, 4],
            [3, 22, 4],
            [3, 23, 1],
            [4, 0, 1],
            [4, 1, 3],
            [4, 2, 0],
            [4, 3, 0],
            [4, 4, 0],
            [4, 5, 1],
            [4, 6, 0],
            [4, 7, 0],
            [4, 8, 0],
            [4, 9, 2],
            [4, 10, 4],
            [4, 11, 4],
            [4, 12, 2],
            [4, 13, 4],
            [4, 14, 4],
            [4, 15, 14],
            [4, 16, 12],
            [4, 17, 1],
            [4, 18, 8],
            [4, 19, 5],
            [4, 20, 3],
            [4, 21, 7],
            [4, 22, 3],
            [4, 23, 0],
            [5, 0, 2],
            [5, 1, 1],
            [5, 2, 0],
            [5, 3, 3],
            [5, 4, 0],
            [5, 5, 0],
            [5, 6, 0],
            [5, 7, 0],
            [5, 8, 2],
            [5, 9, 0],
            [5, 10, 4],
            [5, 11, 1],
            [5, 12, 5],
            [5, 13, 10],
            [5, 14, 5],
            [5, 15, 7],
            [5, 16, 11],
            [5, 17, 6],
            [5, 18, 0],
            [5, 19, 5],
            [5, 20, 3],
            [5, 21, 4],
            [5, 22, 2],
            [5, 23, 0],
            [6, 0, 1],
            [6, 1, 0],
            [6, 2, 0],
            [6, 3, 0],
            [6, 4, 0],
            [6, 5, 0],
            [6, 6, 0],
            [6, 7, 0],
            [6, 8, 0],
            [6, 9, 0],
            [6, 10, 1],
            [6, 11, 0],
            [6, 12, 2],
            [6, 13, 1],
            [6, 14, 3],
            [6, 15, 4],
            [6, 16, 0],
            [6, 17, 0],
            [6, 18, 0],
            [6, 19, 0],
            [6, 20, 1],
            [6, 21, 2],
            [6, 22, 2],
            [6, 23, 6]
          ]
        }
      }
    },
    setting: {},
    database: {
      data: {
        type: "object",
        component: "dataSource",
        options: {
          height: 600
        }
      }
    }
  }
];

export default otherConfig;
