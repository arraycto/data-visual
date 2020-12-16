import React, { useRef, useEffect } from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { usePrevious } from "~renderer/common/hooks";
import { isLooselyNumber, isCssLength, convertValue, isHidden, getEnum } from "../utils";

import { IconFont } from "~components";

// asField拆分成逻辑组件和展示组件，从而可替换展示组件的方式完全插拔的样式
export const asField = ({ FieldUI, Widget }) => {
  let FieldContainer = ({ isRoot, hidden, props, labelWidth, isTip, disabled, readonly, options, schema, ...rest }) => {
    const firstRender = useRef(true);
    const fieldTouched = useRef(false);
    const { displayType, rootValue = {}, formData = {}, value: _value } = rest;
    const prevValue = usePrevious(_value);
    // most key of schema, disabled, readonly, options, hidden, support for function expression
    useEffect(() => {
      // 首次渲染不处理
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      // 已经动过了就不用验证是否动过
      if (fieldTouched.current === true) return;
      // 之后每次改动就算touch了，尽量避免多余的去使用isEqual，大的复杂表单性能会不好
      if (isEqual(prevValue, _value)) return;
      fieldTouched.current = true;
    }, [_value]);

    const _hidden = convertValue(hidden, formData, rootValue);
    const _disabled = convertValue(disabled, formData, rootValue);
    const _readonly = convertValue(readonly, formData, rootValue);
    const _options = { ...options };
    try {
      Object.entries(options).forEach(([key, _val]) => {
        _options[key] = convertValue(_val, formData, rootValue);
      });
    } catch (e) {}
    // iterate over schema, and convert every key
    let _schema = { ...schema };
    Object.keys(schema).forEach((key) => {
      const availableKey = ["title", "description", "format", "message", "min", "max", "step", "enum", "enumNames"];
      // TODO: need to cover more
      if (availableKey.indexOf(key) > -1) {
        _schema[key] = convertValue(schema[key], formData, rootValue);
      }
    });

    // after "convertValue" being stable, this api will be discarded
    if (_hidden && isHidden({ hidden: _hidden, rootValue, formData })) {
      return null;
    }

    // 传入组件的值
    const porps = {
      ...rest,
      schema: _schema,
      disabled: _disabled,
      readonly: _readonly,
      options: _options,
      formData: formData || {},
      rootValue: rootValue || {}
    };

    let isComplex = _schema.type === "object" || (_schema.type === "array" && getEnum(_schema) === undefined);
    const isModal = options && (options.modal || options.drawer);
    if (isModal) {
      isComplex = false;
    }

    const showLabel = _schema.title || rest.description;

    const fieldProps = {
      displayType,
      isComplex,
      isRoot,
      schema: _schema,
      showLabel,
      labelWidth,
      isTip
    };

    return (
      <FieldUI {...fieldProps}>
        <Widget {...porps} />
      </FieldUI>
    );
  };

  FieldContainer.propTypes = {
    isRoot: PropTypes.bool,
    props: PropTypes.object,
    displayType: PropTypes.string,
    isTip: PropTypes.bool
  };

  FieldContainer.defaultProps = {
    isRoot: false,
    props: {},
    displayType: "row",
    isTip: false
  };

  return FieldContainer;
};

/**
 * @param displayType 展示方式：row 横 column 竖
 * @param showLabel 是否展示label
 * @param labelWidth label的长度
 */
export const DefaultFieldUI = ({ schema, children, displayType, showLabel, isComplex, labelWidth, isTip }) => {
  // field 整体 label 标签 content 内容
  const { title, description = "" } = schema;
  // const isCheckbox = type === "boolean" && widget !== "switch";
  const _labelWidth = isLooselyNumber(labelWidth) ? Number(labelWidth) : isCssLength(labelWidth) ? labelWidth : 85;

  const _widgetClass = displayType === "column" ? "field-flex field-flex__vertical" : "field-flex";

  return (
    <div className={_widgetClass}>
      {showLabel && (
        <div
          className={isComplex ? "field-flex__object" : "field-flex__label"}
          style={displayType === "row" ? { width: _labelWidth } : {}}
        >
          <label className="field-flex__title" title={title}>
            <span className={`${displayType === "column" ? "field-flex__none" : ""}`}>{title}</span>
            {description &&
              (isTip ? (
                <Tooltip title={description}>
                  <IconFont
                    antd={true}
                    type="QuestionCircleOutlined"
                    style={{
                      marginLeft: 3,
                      color: "#177ddc"
                    }}
                  />
                </Tooltip>
              ) : (
                <span className="field-flex__desc">(&nbsp;{description}&nbsp;)</span>
              ))}
          </label>
        </div>
      )}
      <div className="field-flex__control">{children}</div>
    </div>
  );
};
