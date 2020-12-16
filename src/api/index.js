import fetch from "@/utils/http";

/**
 * @description 账户登录
 */
export function accountIn(param) {
  return fetch({
    url: "/user/login",
    method: "post",
    data: param
  });
}

export function echartBarAPI() {
  return fetch({
    url: "/echart/bar",
    method: "get"
  });
}

export function echartPieAPI() {
  return fetch({
    url: "/echart/pie",
    method: "get"
  });
}

export function echartScatterAPI() {
  return fetch({
    url: "/echart/scatter",
    method: "get"
  });
}

export function echartRadarAPI() {
  return fetch({
    url: "/echart/radar",
    method: "get"
  });
}

export function dataVScreen() {
  return fetch({
    url: "/datav/screen",
    method: "post"
  });
}

export function dataVGrid() {
  return fetch({
    url: "/datav/grid",
    method: "post"
  });
}

export function dataVApiList() {
  return fetch({
    url: "/datav/api",
    method: "get"
  });
}

export function dataVSqlList() {
  return fetch({
    url: "/datav/sql",
    method: "get"
  });
}

export function dataVTableList() {
  return fetch({
    url: "/component/table",
    method: "get"
  });
}

export function dataVTables() {
  return fetch({
    url: "/component/tables",
    method: "get"
  });
}
