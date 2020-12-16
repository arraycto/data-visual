/**
 * 基于react-grid-layout的核心拖拽方案
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import cx from "classnames";
import { WidthProvider, Responsive } from "react-grid-layout";
import { getField } from "../common/context";
import { useEditorStore } from "../common/hooks";
import { mergeField, setLevelPath } from "../utils";
import generator from "./generator";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GeneratorField = ({ value, onValueChange }) => {
  const { state, setState } = useEditorStore();
  const { title, hideTitle, titleAlign, titleColor, background, ...rest } = value.data;
  const isSelect = state.selected === value.uniqueId;
  const className = cx("gc-field-grid animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSelect) return;
    setState({
      selected: value.uniqueId
    });
  };

  const overwriteStyle = {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: isSelect ? "#2681ff" : "transparent",
    background,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = (m) => {
    const prop = getField(value.type);
    return generator(prop)(m);
  };

  const fieldProps = useMemo(
    () => ({
      value: value.data,
      uniqueId: value.uniqueId,
      options: value.data.config || {},
      onChange: (val, level = 1) => {
        onValueChange(value.uniqueId, val, level);
      }
    }),
    [isSelect, value.data, onValueChange]
  );

  return (
    <div className={className} style={overwriteStyle} onClick={handleClick}>
      {!hideTitle ? (
        <div
          className="grid-hd"
          style={{
            color: titleColor,
            textAlign: titleAlign
          }}
        >
          {title}
        </div>
      ) : null}
      <div className="grid-bd">{getSubField(fieldProps)}</div>
    </div>
  );
};

const GeneratorWidget = ({ widgets = [] }) => {
  if (widgets.length === 0) return null;
  const [status, setStatus] = useState(false);
  const [layouts, setLayouts] = useState({});
  const { state, setState } = useEditorStore();

  useEffect(() => {
    setStatus(true);
    const generateLayout = widgets.map((o) => {
      return {
        i: o.uniqueId,
        x: o.data.left,
        y: o.data.top,
        w: o.data.width,
        h: o.data.height
      };
    });
    setLayouts({
      lg: generateLayout,
      sm: generateLayout
    });
  }, [state.uniqueId, state.components]);

  const onDragHandle = (layout, oldItem, newItem, placeholder, e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: fix拖拽和点击事件冲突
    if (layouts.lg.some((o) => o.i === oldItem.i)) return;
  };

  const onLayoutChange = (layout) => {
    let results;
    if (status) {
      for (const o of layout) {
        results = mergeField(
          widgets,
          o.i,
          {
            width: o.w,
            height: o.h,
            left: o.x,
            top: o.y
          },
          0
        );
      }

      setState({
        components: results
      });
    }
  };

  const onValueChange = useCallback((uniqueId, value, level = 0) => {
    setLevelPath(state.components, null);
    let results = mergeField(state.components, uniqueId, value, level);
    setState({
      components: results
    });
  });

  return (
    <ResponsiveGridLayout
      breakpoints={{ lg: 768, md: 0, sm: 0, xs: 0, xxs: 0 }}
      cols={{ lg: 12, md: 1, sm: 1, xs: 1, xxs: 1 }}
      rowHeight={0}
      isResizable={true}
      isDraggable={true}
      containerPadding={[0, 0]}
      useCSSTransforms={false}
      layouts={layouts}
      onDragStart={onDragHandle}
      onLayoutChange={onLayoutChange}
    >
      {widgets.map((prop) => (
        <div
          key={prop.uniqueId}
          data-grid={{
            x: prop.data.left || ((widgets.length - 1) * 3) % 12,
            y: prop.data.top || Infinity, // puts it at the bottom
            w: prop.data.width || 0,
            h: prop.data.height || 25
          }}
        >
          {!prop.data.isHidden ? (
            <GeneratorField value={prop} key={prop.uniqueId} onValueChange={onValueChange} />
          ) : null}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GeneratorWidget;
