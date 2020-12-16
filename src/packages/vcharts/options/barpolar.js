import { DEFAULT_COLORS } from "~packages/constants";

export function getOption(option, data) {
  const { categories = [], series = [] } = data;
  const {
    pointerLineColor = "#19d4ae",
    pointerLine = true,
    angleAxis = false,
    splitLine = false,
    barWidth = "auto",
    stack = false,
    unit = ""
  } = option;

  return {
    color: DEFAULT_COLORS,
    grid: {
      top: 20,
      left: 15,
      right: 20,
      bottom: 30,
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: pointerLine ? "line" : "none",
        lineStyle: {
          color: pointerLineColor
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      formatter: function (params) {
        return [params[0].marker + params[0].name + "：" + (params[0].data || 0) + unit].join("");
      }
    },
    angleAxis: {
      show: angleAxis
    },
    polar: {
      center: ["50%", "50%"]
    },
    radiusAxis: {
      type: "category",
      data: categories,
      z: 1,
      splitLine: {
        show: splitLine,
        lineStyle: {
          color: "#19d4ae",
          width: 1,
          type: "solid"
        }
      }
    },
    series: series.map((item) => {
      return {
        type: "bar",
        barWidth: barWidth,
        coordinateSystem: "polar",
        stack: stack ? "something" : "",
        data: item.data
      };
    })
  };
}
