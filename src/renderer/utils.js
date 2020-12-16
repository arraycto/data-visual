import { cloneDeep } from "lodash";
import { guid } from "@/utils";
import { isEmpty, deep2Merge } from "@/utils/helper";

export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case "date":
      dateFormat = "YYYY-MM-DD";
      break;
    case "time":
      dateFormat = "HH:mm:ss";
      break;
    case "dateTime":
      dateFormat = "YYYY-MM-DD HH:mm:ss";
      break;
    default:
      dateFormat = "YYYY-MM-DD";
      if (format && typeof format === "string") {
        dateFormat = format;
      }
  }
  return dateFormat;
}

export function isLooselyNumber(num) {
  if (typeof num === "number") return true;
  if (typeof num === "string") {
    return !Number.isNaN(Number(num));
  }
  return false;
}

export function isCssLength(str) {
  if (typeof str !== "string") return false;
  return str.match(/^([0-9])*(%|px|rem|em)$/i);
}

/**
 * 转化样式布局值
 * @param {*} value
 */
export function converLayout(value) {
  return isLooselyNumber(value) ? Number(value) : isCssLength(value) ? value : "100%";
}

// 获得propsSchema的children
function getChildren(schema) {
  if (!schema) return [];
  const {
    // object
    properties,
    // array
    items,
    type
  } = schema;
  if (!properties && !items) {
    return [];
  }
  let schemaSubs = {};
  if (type === "object") {
    schemaSubs = properties;
  }
  if (type === "array") {
    schemaSubs = items;
  }
  return Object.keys(schemaSubs).map((name) => ({
    schema: schemaSubs[name],
    name
  }));
}

// 整合配置Schema
export function combineSchema(propsSchema = {}, uiSchema = {}) {
  const propList = getChildren(propsSchema);
  const newList = propList.map((p) => {
    const { name } = p;
    const { type, enum: options, properties, items } = p.schema;
    const isObj = type === "object" && properties;
    const isArr = type === "array" && items && !options; // enum + array 代表的多选框，没有sub
    const ui = name && uiSchema[p.name];
    if (!ui) {
      return p;
    }
    // 如果是list，递归合并items
    if (isArr) {
      const newItems = combineSchema(items, ui.items || {});
      return { ...p, schema: { ...p.schema, ...ui, items: newItems } };
    }
    // object递归合并整个schema
    if (isObj) {
      const newSchema = combineSchema(p.schema, ui);
      return { ...p, schema: newSchema };
    }
    return { ...p, schema: { ...p.schema, ...ui } };
  });

  const newObj = {};
  newList.forEach((s) => {
    newObj[s.name] = s.schema;
  });

  const topLevelUi = {};
  Object.keys(uiSchema).forEach((key) => {
    topLevelUi[key] = uiSchema[key];
  });
  if (isEmpty(newObj)) {
    return { ...propsSchema, ...topLevelUi };
  }
  return { ...propsSchema, ...topLevelUi, properties: newObj };
}

// 解析函数字符串值
const isValidVariableName = (param) => /^[a-zA-Z]+$/g.test(param);

// Remove all window valid api
// For safety jest-* variable will throw error
function safeEval(code) {
  let safeContextStr = "";
  if (typeof window !== "undefined") {
    const windowContextAttr = Object.getOwnPropertyNames(window).filter(isValidVariableName);
    for (let i = 0, len = windowContextAttr.length; i < len; i++) {
      safeContextStr += `var ${windowContextAttr[i]} = undefined;`;
    }
  }
  return Function(`${safeContextStr} "use strict";  ${code}`)();
}

// 代替eval的函数
export const parseString = (string) => safeEval(`return (${string})`);

// 解析函数字符串值
const evaluateString = (string, formData, rootValue) =>
  safeEval(`
  const rootValue = ${JSON.stringify(rootValue)};
  const formData = ${JSON.stringify(formData)};
  return (${string})
  `);

// 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。
export function isFunction(func) {
  if (typeof func === "function") {
    return true;
  }
  if (typeof func === "string" && func.substring(0, 1) === "@") {
    return func.substring(1);
  }
  if (
    typeof func === "string" &&
    func.substring(0, 2) === "{{" &&
    func.substring(func.length - 2, func.length) === "}}"
  ) {
    return func.substring(2, func.length - 2);
  }
  return false;
}

// 函数表达式转换成值
export const convertValue = (item, formData, rootValue) => {
  if (typeof item === "function") {
    return item(formData, rootValue);
  } else if (typeof item === "string" && isFunction(item) !== false) {
    const _item = isFunction(item);
    try {
      return evaluateString(_item, formData, rootValue);
    } catch (error) {
      console.error(error.message);
      console.error(`happen at ${item}`);
      return item;
    }
  }
  return item;
};

const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === "number" || type === "boolean" || value == null) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
}

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : value.match(/([^\.\[\]"']+)/g);
}

function toKey(value) {
  if (typeof value === "string") {
    return value;
  }
  const result = `${value}`;
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

export function baseGet(object, path) {
  path = castPath(path, object);

  let index = 0;
  const length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

// 计算单个表达式的hidden值
const calcHidden = (hiddenString, rootValue, formData) => {
  if (!rootValue || typeof rootValue !== "object") {
    return false;
  }
  // 支持四种基本运算符
  const operators = ["==", "!=", ">", "<"];
  try {
    const op = operators.find((op) => hiddenString.indexOf(op) > -1);
    const [key, value] = hiddenString.split(op).map((item) => item.trim());
    let left = rootValue[key];
    // feature: 允许从 formData 取值
    if (key.substring(0, 9) === "formData." && formData) {
      const subKey = key.substring(9);
      left = baseGet(formData, subKey);
    }
    const right = parseString(value);
    return parseString(`"${String(left)}"${op}"${String(right)}"`);
  } catch (e) {
    console.error(e);
  }
  return false;
};

export function isHidden({ hidden, rootValue, formData } = {}) {
  if (typeof hidden === "string") {
    // 支持 && 和 ||
    const hasAnd = (string) => string.indexOf("&&") > -1;
    const hasOr = (string) => string.indexOf("||") > -1;
    let hiddenList = [];
    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData);
      } else {
        hiddenList = hidden.split("&&").map((item) => item.trim());
        return hiddenList.every((item) => calcHidden(item, rootValue, formData));
      }
    } else {
      hiddenList = hidden.split("||").map((item) => item.trim());
      if (!hasAnd(hidden)) {
        return hiddenList.some((item) => calcHidden(item, rootValue, formData));
      } else {
        return hiddenList.some((item) => {
          if (hasAnd(item)) {
            const list = item.split("&&").map((item) => item.trim());
            return list.every((x) => calcHidden(x, rootValue, formData));
          } else {
            return calcHidden(item, rootValue, formData);
          }
        });
      }
    }
  }
  return hidden;
}

export const getEnum = (schema) => {
  if (!schema) return undefined;
  const itemEnum = schema && schema.items && schema.items.enum;
  const schemaEnum = schema && schema.enum;
  return itemEnum ? itemEnum : schemaEnum;
};

/**
 * 新建组件生成配置项
 * @param {*} fields 所有组件配置项
 * @param {*} opts 当前组件配置项
 */
export function generatorField(fields, opts = {}) {
  let options;
  options = cloneDeep(opts);
  // 唯一标识uniqueTag
  const uniqueId = guid();
  let obj = { ...options, uniqueId: uniqueId };
  return { components: fields.concat(obj), fieldId: uniqueId };
}

/**
 * 获取当前组件配置项
 * @param {*} fields 所有组件配置项
 * @param {*} id 当前组件id
 */
export function getFieldConf(fields, id) {
  return fields.filter((o) => id === o.uniqueId)[0];
}

/**
 * 编译具有层级的数据结构
 * @param {*} flatTree
 * @param {*} deep
 */
export function setLevelPath(nodes, parentNode, key = "drillDownLevel") {
  if (nodes.length === 0) return;
  for (let i = 0; i < nodes.length; i++) {
    if (!parentNode) {
      nodes[i].data[key] = 0;
    } else {
      nodes[i].data[key] = parentNode.data[key] + 1;
    }

    if (nodes[i].data.drillDown && nodes[i].data.drillDown.length > 0) {
      setLevelPath(nodes[i].data.drillDown, nodes[i], key);
    }
  }
}

/**
 * 下钻数据处理 so we have always a relation parent/children of each node
 * @param {*} treeData
 * @param {*} key
 * @param {*} level
 */
function getLevelData(treeData, key, level, value) {
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].data[key] && treeData[i].data[key] === level) {
      treeData[i].data = deep2Merge(treeData[i].data, value);
      break;
    }
    if (treeData[i].data.drillDown && treeData[i].data.drillDown.length > 0) {
      getLevelData(treeData[i].data.drillDown, key, level, value);
    }
  }
}

/**
 * 合并组件配置项
 * @param {*} fields 所有组件配置项
 * @param {*} opts 当前组件id、需要合并后的属性值、数据层级
 */
export function mergeField(fields, id, value, level) {
  if (isEmpty(value)) return fields;

  let objKey = "drillDownLevel";

  let newFiled = fields.map((n) => {
    if (n.uniqueId === id) {
      if (level > 0) {
        // TODO: 下钻数据合并
        getLevelData(n.data.drillDown, objKey, level, value);
      } else {
        n.data = deep2Merge(n.data, value);
      }
    }
    return n;
  });

  return newFiled;
}

/**
 * 调整顺序
 * @param {*} arr
 * @param {*} next 添加元素的位置
 * @param {*} prev 删除元素的位置
 */
export function orderBy(arr, next, prev) {
  arr[next] = arr.splice(prev, 1, arr[next])[0];
  return arr;
}

/**
 * 获取组件的索引值
 * @param {*} fields 所有组件配置项
 * @param {*} id 当前组件id
 */
export function getFieldOrderBy(fields, id) {
  if (isEmpty(fields)) return {};

  let newFiled = cloneDeep(fields);
  const index = newFiled.findIndex((o) => o.uniqueId === id);
  return { index, components: newFiled };
}
