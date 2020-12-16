/**
 * 基于rnd的核心拖拽方案
 */
import React, { memo, useMemo } from "react";
import cx from "classnames";
import { Rnd } from "react-rnd";
import { getField } from "../common/context";
import { useCompose, useEditorStore } from "../common/hooks";
import { round } from "@/utils/helper";
import { converLayout } from "../utils";

import generator from "./generator";

const GeneratorField = ({ value, onValueChange }) => {
  const { width, height, background, left, top, isHidden, isLock, ...rest } = value.data;
  const { state, setState } = useEditorStore();
  const { view } = useCompose();
  const isSelect = state.selected === value.uniqueId;
  const classNames = cx("gc-field animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });
  const isEditing = useMemo(() => {
    return !isSelect || isLock || isHidden;
  }, [isSelect, isLock, isHidden]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSelect) return;

    setState({
      selected: value.uniqueId,
      tabsKey: "base"
    });
  };

  const overwriteStyle = {
    width: converLayout(width),
    height: converLayout(height),
    borderStyle: rest.borderStyle || "solid",
    borderColor: isSelect ? "#2681ff" : "transparent",
    background,
    borderRadius: rest.borderRadius,
    borderWidth: rest.borderWidth || 2,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = (m) => {
    const field = getField(value.type);
    return generator(field)(m);
  };

  const onDragHandle = (e, d) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: fix拖拽和点击事件冲突
    if (value.data.left == d.x && value.data.top == d.y) return;

    onValueChange(
      value.uniqueId,
      Object.assign(value.data, {
        left: parseInt(round(d.lastX)),
        top: parseInt(round(d.lastY))
      })
    );
  };

  const onResizeHandle = (e, direction, ref, delta, position) => {
    e.preventDefault();
    e.stopPropagation();

    onValueChange(
      value.uniqueId,
      Object.assign(value.data, {
        left: parseInt(round(position.x)),
        top: parseInt(round(position.y)),
        width: ref.offsetWidth,
        height: ref.offsetHeight
      })
    );
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
    [isSelect, onValueChange]
  );

  return (
    <Rnd
      size={{ width: width, height: height }}
      position={{ x: left, y: top }}
      id={value.uniqueId}
      bounds="body"
      dragAxis="both"
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return;
      }}
      disableDragging={isEditing}
      enableResizing={!isEditing}
      scale={view.scale}
      onDragStop={onDragHandle}
      onResize={onResizeHandle}
      onResizeStop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return;
      }}
    >
      <div className={classNames} style={overwriteStyle} onClick={handleClick}>
        {!isHidden ? getSubField(fieldProps) : null}
        {isSelect ? (
          <div className="widget-circle">
            <div className="widget-circle__top">
              <div className="top-left"></div>
              <div className="top-center"></div>
              <div className="top-right"></div>
            </div>
            <div className="widget-circle__bottom">
              <div className="bottom-left"></div>
              <div className="bottom-center"></div>
              <div className="bottom-right"></div>
            </div>
            <div className="widget-circle__left">
              <div className="left-center"></div>
            </div>
            <div className="widget-circle__right">
              <div className="right-center"></div>
            </div>
          </div>
        ) : null}
      </div>
    </Rnd>
  );
};

export default memo(GeneratorField);
