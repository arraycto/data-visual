import checkbox from "./checkbox";
import checkboxes from "./checkbox/group";
import color from "./color-picker";
import date from "./date-picker";
import dateRange from "./date-picker/range";
import input from "./input";
import map from "./map";
import multiSelect from "./select/multi";
import number from "./number";
import radio from "./radio";
import select from "./select";
import slider from "./slider";
import switch1 from "./switch";
import textarea from "./textarea";
import upload from "./upload";
import uploadCrop from "./upload/crop";
import uploadExcel from "./upload/excel";

import dataSource from "./data-source";
import drillDownSelect from "./select/drill-down-item";
import dependenceSelect from "./select/dependence-item";

const widgets = {
  checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input,
  map,
  multiSelect, // 下拉多选
  number,
  radio,
  select,
  slider, // 带滚条的number
  switch: switch1,
  textarea,
  upload,
  uploadCrop,
  uploadExcel,
  dataSource,
  drillDownSelect,
  dependenceSelect
};

// 组件映射关系
const mapping = {
  default: "input",
  string: "input",
  boolean: "checkbox",
  integer: "number",
  number: "number",
  object: "map",
  "string:upload": "upload",
  "string:crop": "uploadCrop",
  "string:excel": "uploadExcel",
  "string:date": "date",
  "string:dateTime": "date",
  "string:time": "date",
  "string:textarea": "textarea",
  "string:color": "color",
  "string:image": "input",
  "range:date": "dateRange",
  "range:dateTime": "dateRange",
  "*?enum": "select",
  "array?enum": "checkboxes",
  "*?readonly": "text"
};

export { widgets, mapping };
