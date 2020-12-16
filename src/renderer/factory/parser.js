import getField from "./getField";
import resolve from "./resolve";
import subFieldGenerator from "./subFieldGenerator";

// 对于数组或对象类型，获取其子集schema
function getSubSchemas(schema = {}) {
  const {
    // object subset
    properties,
    // array subset
    items,
    // as subset's parent
    ...$parent
  } = schema;
  const { type } = $parent;
  // no subset
  if (!properties && !items) {
    return [];
  }
  let children = {};
  if (type === "object") {
    children = properties;
  }
  if (type === "array") {
    children = [].concat(items);
  }
  return Object.keys(children).map((name) => ({
    schema: children[name],
    name,
    // parent propsSchema
    $parent
  }));
}

function getBasicProps(settings, materials) {
  const {
    displayName,
    schema,
    name = "",
    displayType,
    readOnly, // 添加全局控制只读模式
    labelWidth,
    formData,
    disabled = false,
    isTip
  } = settings;
  if (!schema) return {};

  // 目前做了处理的`uiSchema`参数
  const {
    className,
    options: options = {},
    hidden,
    disabled: _disabled,
    readonly,
    extraButtons: extraButtons = [],
    action,
    isTip: _isTip,
    labelWidth: _labelWidth
  } = schema;
  const { generated: widgets, customized: fields } = materials;
  // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  let basicProps = {
    displayName,
    name,
    schema,
    displayType,
    isTip: _isTip || isTip,
    options, // 所有特定组件规则，addable等规则TODO
    hidden,
    disabled: _disabled || disabled,
    readonly: readOnly || readonly, // 前者全局的，后者单个ui的
    labelWidth: _labelWidth || labelWidth,
    widgets,
    fields,
    formData
  };
  if (className) {
    basicProps = { ...basicProps, className };
  }
  if (action) {
    basicProps = { ...basicProps, action };
  }
  // 子集的属性
  const subItems = {};
  const subSchemas = getSubSchemas(schema);
  subSchemas.forEach((subSchema) => {
    const { name: _name, schema: _schema = {} } = subSchema;

    subItems[_name] = {
      field: getField(_schema, materials),
      props: getBasicProps(
        {
          ...subSchema,
          displayName,
          displayType: _schema.displayType || displayType,
          isTip,
          readOnly,
          labelWidth: _labelWidth || labelWidth,
          formData,
          disabled: _disabled || disabled
        },
        materials
      )
    };
  });
  if (["array", "object"].indexOf(schema.type) >= 0) {
    // 传入name和Field（如果重定义Field的话）及其配置信息（如onChange等）
    basicProps.getSubField = (m) => {
      const { field, props } = subItems[m.name] || subItems[0] || {};

      return subFieldGenerator({
        ...field,
        props: {
          ...props,
          name: m.name,
          rootValue: m.rootValue
        }
      })(m);
    };
    if (schema.type === "array" && schema.items) {
      // 将数组uiSchema配置里面的抽离出来使用
      basicProps.extraButtons = extraButtons;
      // 数组新增的默认值
      if (subSchemas && subSchemas[0]) {
        basicProps.newItem = resolve(subSchemas[0].schema);
      }
    }
  }
  return basicProps;
}

/**
 *  schema + materials --> parse --> Field + props
 *  schema {
 *    propsSchema,
 *    uiSchema,
 *    data,
 *    name,
 *  }
 *  materials {
 *    generated,
 *    customized,
 *    mapping,
 *  }
 */
const parse = (settings = {}, materials) => {
  const { schema = {} } = settings;
  return {
    Field: getField(schema, materials).Field,
    props: getBasicProps(settings, materials)
  };
};

export default parse;
