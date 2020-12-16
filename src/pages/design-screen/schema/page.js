export default {
  type: "object",
  properties: {
    page: {
      type: "object",
      title: "控制面板",
      description: "大屏页面整体配置(大屏的删除、目录结构调整等，请在管理中心的『大屏管理』中进行！)",
      displayType: "column",
      properties: {
        name: {
          title: "大屏名称",
          type: "string",
          displayType: "row",
          options: { allowClear: true, placeholder: "请输入名称" }
        },
        remark: {
          title: "大屏简介",
          type: "string",
          format: "textarea",
          displayType: "row",
          options: { placeholder: "请输入简介" }
        },
        pageSize: {
          title: "屏幕大小",
          type: "string",
          enum: ["small", "middle", "large", "mobile"],
          enumNames: ["1366 x 768", "1440 x 960", "1920 x 1080", "750 x 1334"],
          displayType: "row",
          options: {
            placeholder: "请选择页面分辨率"
          }
        },
        zoom: {
          title: "缩放设置",
          type: "string",
          component: "radio",
          displayType: "row",
          enum: ["scaleY", "scaleX", "cover"],
          enumNames: ["等比例缩放高度铺满", "等比例缩放宽度铺满", "全屏铺满"]
        },
        backgroundColor: {
          title: "背景颜色(背景图片透明时可见)",
          type: "string",
          component: "color",
          hidden: "{{rootValue.backgroundImage !== ''}}"
        },
        backgroundImage: {
          title: "背景图",
          type: "string",
          format: "upload",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        },
        backgroundBlur: {
          title: "背景图片模糊度",
          type: "number",
          component: "slider",
          min: 0,
          max: 20,
          options: {
            hideNumber: true
          }
        },
        backgroundOpacity: {
          title: "背景图片透明度",
          type: "number",
          component: "slider",
          min: 0,
          max: 10,
          options: {
            hideNumber: true
          }
        }
      }
    }
  }
};
