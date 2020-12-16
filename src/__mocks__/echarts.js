import Mock from "mockjs";
const BASE_URL = process.env.REACT_APP_API;

// 柱状/条形图
Mock.mock(BASE_URL + "/echart/bar", {
  data: {
    categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
    series: [
      {
        name: "旺季",
        "data|7": ["@integer(10000, 25000)"]
      }
    ],
    unit: "台"
  }
});

// 饼图
Mock.mock(BASE_URL + "/echart/pie", {
  data: {
    series: [
      {
        name: "苹果",
        data: "@integer(10000, 25000)"
      },
      {
        name: "三星",
        data: "@integer(10000, 25000)"
      },
      {
        name: "华为",
        data: "@integer(10000, 25000)"
      },
      {
        name: "oppo",
        data: "@integer(3000, 10000)"
      },
      {
        name: "vivo",
        data: "@integer(10000, 25000)"
      },
      {
        name: "小米",
        data: "@integer(5000, 15000)"
      }
    ],
    unit: "台"
  }
});

// 散点图
Mock.mock(BASE_URL + "/echart/scatter", {
  data: {
    categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
    series: [
      {
        name: "旺季",
        data: [
          {
            name: "苹果",
            "data|2-5": ["@integer(10000, 25000)"]
          },
          {
            name: "三星",
            "data|2-5": ["@integer(10000, 25000)"]
          },
          {
            name: "华为",
            "data|2-5": ["@integer(10000, 25000)"]
          },
          {
            name: "oppo",
            "data|2-5": ["@integer(3000, 10000)"]
          },
          {
            name: "vivo",
            "data|2-5": ["@integer(10000, 25000)"]
          },
          {
            name: "小米",
            "data|2-5": ["@integer(500, 1500)"]
          }
        ]
      },
      {
        name: "淡季",
        data: [
          {
            name: "苹果",
            "data|2-5": ["@integer(1000, 2500)"]
          },
          {
            name: "三星",
            "data|2-5": ["@integer(1000, 2500)"]
          },
          {
            name: "华为",
            "data|2-5": ["@integer(1000, 2500)"]
          },
          {
            name: "oppo",
            "data|2-5": ["@integer(300, 2500)"]
          },
          {
            name: "vivo",
            "data|2-5": ["@integer(1000, 2500)"]
          },
          {
            name: "小米",
            "data|2-5": ["@integer(500, 2500)"]
          }
        ]
      }
    ],
    unit: "台"
  }
});

// 雷达图
Mock.mock(BASE_URL + "/echart/radar", {
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
});

// 表格
Mock.mock(BASE_URL + "/component/table", {
  data: [
    { key: "name1", name: "名称1", data: ["A产品", "B产品", "C产品", "D产品", "E产品"] },
    { key: "name2", name: "name2", data: ["苹果", "梨子", "香蕉", "葡萄", "芒果"] },
    { key: "name3", name: "name3", data: ["猫", "狗", "羊", "牛", "鸡"] },
    { key: "name4", name: "name4", data: ["iphone", "huawei", "xiaomi", "ovov", "oppo"] },
    { key: "v1", name: "数据1", data: [100, 100, 101, 123, 22] },
    { key: "v2", name: "v2", data: [200, 200, 123, 76, 159] },
    { key: "v3", name: "v3", data: [300, 220, 145, 123, 131] },
    { key: "v4", name: "v4", data: [400, 120, 113, 111, 202] },
    { key: "remark", name: "remark", data: [null, null, null, null, null] },
    { key: "id", name: "id", data: [1, 2, 3, 4, 5] },
    { key: "f1", name: "小数1", data: [0.1, 0.1, 0.2, 0.3, 0.14] },
    { key: "f2", name: "小数2", data: [99.1, 99.2, 85.1, 86.31, 87.5] },
    { key: "f3", name: "小数3", data: [1000.5, 1100.5, 1103.3, 999.8, 1024.12] },
    { key: "t1", name: "时间转日期", data: ["2020-07-21", "2020-09-16", "2020-06-24", "2020-12-25", "2020-04-18"] },
    {
      key: "t2",
      name: "t2",
      data: [
        "2020-09-12 04:49:26",
        "2020-10-18 04:49:26",
        "2020-10-17 04:49:26",
        "2020-08-11 04:49:26",
        "2020-06-08 04:49:26"
      ]
    },
    { key: "t3", name: "t3", data: ["2020-09-15", "2020-07-12", "2020-09-15", "2020-09-15", "2020-12-23"] }
  ]
});
