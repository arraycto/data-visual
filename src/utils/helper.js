function getMenuByProperty(list, key, value) {
  let stack = [];
  stack = stack.concat(list);
  let res;
  while (stack.length) {
    let cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack);
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}
/**
 * 设置页面title
 */
export function getPageTitle(list, pathname) {
  let routerObj = getMenuByProperty(list, "path", pathname);
  let defineTitle = "试验台";

  if (routerObj) {
    defineTitle = routerObj.title;
  }
  const documentTitle = "DataV Pro - {defineTitle}";
  return documentTitle.replace(/{.*}/gi, defineTitle);
}

// 异步加载js、css
export const loadScript = (url, type = "js") => {
  let flag = false;
  return new Promise((resolve) => {
    const head = document.getElementsByTagName("head")[0];
    head.children.forEach((ele) => {
      if ((ele.src || "").indexOf(url) !== -1) {
        flag = true;
        resolve();
      }
    });
    if (flag) return;
    let script;
    if (type === "js") {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
    } else if (type === "css") {
      script = document.createElement("link");
      script.rel = "stylesheet";
      script.href = url;
    }
    head.appendChild(script);
    script.onload = function () {
      resolve();
    };
  });
};

// 文件下载
export const downFile = (data, name) => {
  var saveLink = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  saveLink.href = data;
  saveLink.download = name;
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  saveLink.dispatchEvent(event);
};

// base64文件转码
export const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  let mine = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mine
  });
};

/**
 * @param {Array} 不同数组，取并集name
 */
export function array2Equal(arr1, arr2) {
  return arr1.concat(arr2.filter((val) => !arr1.includes(val.name)));
}

// 判断是否为空
export function isEmpty(value) {
  if (value === null || value === "" || value === undefined || value.length === 0) {
    return true;
  }

  return false;
}

//  用于显示 html 文本
export function escapeHtml(value) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };
  return String(value).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

// 小数值转百分比
export function percent(value, decimals = 0) {
  value = parseFloat(value) || 0;
  decimals = parseInt(decimals, 10) || 0;

  let whole = value * 100;
  let multiplier = Math.pow(10, decimals);

  return (Math.round(whole * multiplier) / multiplier).toFixed(decimals) + "%";
}

// 四舍五入取整
export function round(value, decimals = 0) {
  if (isNaN(value)) {
    return 0;
  }

  decimals = parseInt(decimals, 10) ?? 2;

  let multiplier = Math.pow(10, decimals);
  return (Math.round(value * multiplier) / multiplier).toFixed(decimals);
}

// 自动给数字加千分位
export function thousand(value) {
  let parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// 当超出若干个字符时，后面的部分直接显示某串字符(ps: 常用于文字限制切分)
export function truncate(value, length, end) {
  end = end || "...";

  if (length == null) {
    return value;
  }

  length = parseInt(length, 10) || 200;

  return value.substring(0, length) + (value.length > length ? end : "");
}

// 获取数据类型
export const toRawType = (value) => {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1);
};

// 深度合并方式一
export function deepMerge(obj1, obj2) {
  if (toRawType(obj2) !== "Object") return obj1;

  let key;
  for (key in obj2) {
    obj1[key] =
      obj1[key] && toRawType(obj1[key]) === "Object" && obj2[key] && toRawType(obj2[key]) === "Object"
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return obj1;
}

// 深度合并方式二
export function deep2Merge(obj1, obj2) {
  if (toRawType(obj2) !== "Object") return obj1;

  for (let [key, value] of Object.entries(obj2)) {
    obj1[key] =
      obj1[key] && toRawType(obj1[key]) === "Object" && value && toRawType(value) === "Object"
        ? deepMerge(obj1[key], value)
        : (obj1[key] = value);
  }
  return obj1;
}

/**
 * 是否为数字 ex："222"、222
 * @param {*} num
 */
export function isLooselyNumber(num) {
  if (toRawType(num) === "Number") return true;
  if (toRawType(num) === "String") {
    return !Number.isNaN(Number(num));
  }
  return false;
}

// 拍平多维数组
export function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some((item) => Array.isArray(item)) ? flattenArray(flattened) : flattened;
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const resolveVariable = (path = "", data = {}) => {
  if (!path) {
    return undefined;
  }

  if (path === "$$") {
    return data;
  } else if (path[0] === "$") {
    path = path.substring(1);
  } else if (path === "&") {
    return data;
  }

  if (typeof data[path] !== "undefined") {
    return data[path];
  }

  let parts = path.replace(/^{|}$/g, "").split(".");
  return parts.reduce((data, path) => {
    if ((toRawType(data) === "Object" || Array.isArray(data)) && path in data) {
      return data[path];
    }

    return undefined;
  }, data);
};
