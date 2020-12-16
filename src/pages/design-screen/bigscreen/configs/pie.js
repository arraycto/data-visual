const pieConfig = [
  {
    text: "饼图",
    name: "echartsPie1",
    icon: "pie_5d94603",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "pie",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "台",
        legendFontSize: 12,
        showLabel: false,
        showLegend: true
      },
      data: {
        series: [
          {
            name: "苹果",
            data: 22338
          },
          {
            name: "三星",
            data: 10477
          },
          {
            name: "华为",
            data: 13862
          },
          {
            name: "oppo",
            data: 7170
          },
          {
            name: "vivo",
            data: 18325
          },
          {
            name: "小米",
            data: 10558
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
      showLabel: {
        title: "是否显label",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      }
    },
    database: {
      series: {
        type: "object",
        component: "dataSource",
        options: {
          height: 300
        }
      }
    }
  },
  {
    text: "环形饼图",
    name: "echartsPie2",
    icon: "pie-nested_72c9846",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "pie",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "台",
        isCirclePie: true,
        showLegend: false
      },
      data: {
        series: [
          {
            name: "苹果",
            data: 22338
          },
          {
            name: "三星",
            data: 10477
          },
          {
            name: "华为",
            data: 13862
          },
          {
            name: "oppo",
            data: 7170
          },
          {
            name: "vivo",
            data: 18325
          },
          {
            name: "小米",
            data: 10558
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
      showLegend: {
        title: "是否显示图例",
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
          height: 300
        }
      }
    }
  },
  {
    text: "玫瑰饼图",
    name: "echartsPieRose",
    icon: "rose-pie_57a20ca",
    schema: {
      type: "object",
      width: 400,
      height: 250,
      component: "pie",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        unit: "台",
        isCirclePie: false,
        isRoseType: true
      },
      data: {
        series: [
          {
            name: "苹果",
            data: 22338
          },
          {
            name: "三星",
            data: 10477
          },
          {
            name: "华为",
            data: 13862
          },
          {
            name: "oppo",
            data: 7170
          },
          {
            name: "vivo",
            data: 18325
          },
          {
            name: "小米",
            data: 10558
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
      showLegend: {
        title: "是否显示图例",
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
          height: 300
        }
      }
    }
  },
  {
    text: "嵌套饼图",
    name: "echartsPieNested",
    icon: "pie_72c9846",
    schema: {
      type: "object",
      width: 500,
      height: 350,
      component: "pie",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        sortType: "nestPie",
        unit: "台",
        isCirclePie: false,
        showLegend: true,
        labelLineLength: 20,
        labelLineLength2: 140
      },
      data: {
        series: {
          inner: [
            {
              value: 700,
              unit: "个",
              name: "行业大类1"
            },
            {
              value: 679,
              unit: "个",
              name: "行业大类2"
            },
            {
              value: 1548,
              unit: "个",
              name: "行业大类3"
            }
          ],
          outer: [
            {
              value: 310,
              unit: "个",
              name: "邮件营销"
            },
            {
              value: 234,
              unit: "个",
              name: "联盟广告"
            },
            {
              value: 335,
              unit: "个",
              name: "视频广告"
            },
            {
              value: 548,
              unit: "个",
              name: "百度"
            },
            {
              value: 351,
              unit: "个",
              name: "谷歌"
            },
            {
              value: 247,
              unit: "个",
              name: "必应"
            }
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
      showLegend: {
        title: "是否显示图例",
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
          height: 300
        }
      }
    }
  },
  {
    text: "轮播饼图",
    name: "echartsPiePlay",
    icon: "pie-play_30f69b4",
    schema: {
      type: "object",
      width: 500,
      height: 350,
      component: "pie",
      dataType: "json",
      dataSqlId: "",
      dataSqlConfig: "",
      dataApiUrl: "",
      dataApiConfig: "",
      isRefresh: true,
      refreshTime: 1800,
      options: {
        sortType: "swiperPie",
        unit: "台",
        isCirclePie: true,
        showLegend: true,
        showLabel: false,
        swiperTimer: 3
      },
      data: {
        series: [
          ["正常请求次数", "满请求次数", "错误请求次数"],
          [200, 400, 700]
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
      showLegend: {
        title: "是否显示图例",
        type: "boolean",
        displayType: "inline",
        component: "switch"
      },
      swiperTimer: {
        title: "轮播时间间隔(s)",
        type: "number",
        options: {
          min: 1,
          step: 10
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
  }
];

export default pieConfig;
