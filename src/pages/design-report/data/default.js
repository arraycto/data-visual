// 公共基础配置项抽离
const BASE_CONF = {
  width: 3,
  height: 25,
  left: 0,
  top: 0,
  titleAlign: "left",
  titleColor: "rgba(188, 201, 212, 1)",
  link: "",
  background: "",
  isLock: false,
  isHidden: false,
  remark: "",
  isCustomStyle: false,
  borderRadius: "",
  borderColor: "",
  borderWidth: "",
  borderStyle: "solid",
  shadowOffset: 0,
  shadowColor: "",
  shadowWidth: 0,
  animateType: "",
  animateTime: "",
  animateSpeed: "",
  animateRepeat: "",
  drillDownOpen: false,
  drillDown: [],
  dependenceOpen: false,
  dependence: []
};

// 公共数据配置项抽离
const BASE_CONF_DATA = {
  dataType: "json",
  dataSqlId: "",
  dataModals: {},
  dataApiId: "",
  isRefresh: true,
  refreshTime: 1800
};

export { BASE_CONF, BASE_CONF_DATA };
