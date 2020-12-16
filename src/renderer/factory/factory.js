import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { asField, DefaultFieldUI } from "./asField";
import parser from "./parser";
import resolve from "./resolve";
import { combineSchema } from "../utils";

function RenderField({ fields, onChange, ...settings }) {
  const { Field, props } = parser(settings, fields);
  if (!Field) {
    return null;
  }
  return <Field isRoot {...props} value={settings.data} onChange={onChange} formData={settings.formData} />;
}

// 在顶层将 propsSchema 和 uiSchema 合并，便于后续处理。 也可直接传入合并的 schema
const Wrapper = ({ schema, propsSchema = {}, uiSchema = {}, readOnly, ...rest }) => {
  const jsonSchema = schema || propsSchema; // 兼容schema字段和propsSchema字段
  const _schema = combineSchema(jsonSchema, uiSchema);

  return <FieldRender readOnly={readOnly} {...rest} schema={_schema} />;
};

/**
 * @param generated 根据 Widget 生成的 Field
 * @param customized 自定义的 Field
 * @param mapping 字段 type 与 widgetName 的映射关系
 */
function FieldRender({
  displayName = null,
  name = "$Field",
  schema = {},
  formData = {},
  widgets = {},
  FieldUI = DefaultFieldUI,
  fields = {},
  mapping = {},
  displayType = "row",
  isTip = true,
  onChange = () => {},
  readOnly = false,
  labelWidth = 85
}) {
  const isUserInput = useRef(false); // 状态改变是否来自于用户操作
  const originWidgets = useRef();
  const generatedFields = useRef({});

  const data = useMemo(() => resolve(schema, formData), [schema]);

  // 用户输入都是调用这个函数
  const handleChange = (key, val) => {
    isUserInput.current = true;
    onChange(val);
  };

  const generated = {};
  if (!originWidgets.current) {
    originWidgets.current = widgets;
  }
  Object.keys(widgets).forEach((key) => {
    const oWidget = originWidgets.current[key];
    const nWidget = widgets[key];
    let gField = generatedFields.current[key];
    if (!gField || oWidget !== nWidget) {
      if (oWidget !== nWidget) {
        originWidgets.current[key] = nWidget;
      }
      gField = asField({ FieldUI, Widget: nWidget });
      generatedFields.current[key] = gField;
    }
    generated[key] = gField;
  });

  const settings = {
    displayName,
    schema,
    data,
    name,
    isTip,
    displayType,
    readOnly,
    labelWidth,
    formData: data
  };

  const _fields = {
    // 根据 Widget 生成的 Field
    generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping
  };

  return (
    <>
      <RenderField {...settings} fields={_fields} onChange={handleChange} />
    </>
  );
}

FieldRender.propTypes = {
  name: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.object,
  widgets: PropTypes.object,
  FieldUI: PropTypes.elementType,
  fields: PropTypes.objectOf(PropTypes.element),
  mapping: PropTypes.object,
  isTip: PropTypes.bool,
  displayType: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  labelWidth: PropTypes.number
};

export default Wrapper;
