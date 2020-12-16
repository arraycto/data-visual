import React, { useEffect, forwardRef, useMemo, useLayoutEffect } from "react";
import { Space, Button, Tooltip } from "antd";
import { IconFont, Scrollbar, SketchRuler } from "~components";
import { useAutoResize, useCompose } from "~renderer/common/hooks";
import { THICK, DIMENSION } from "~renderer/common/constants";

/**
 * 设计器容器大小
 */
const Wrapper = forwardRef((props, ref) => {
  const { pageSize, backgroundColor, backgroundImage, backgroundBlur, backgroundOpacity } = props;
  const { view, setView } = useCompose();
  const { width, height, domRef } = useAutoResize(ref);
  const { rulerWidth, rulerHeight, scale, startX, startY, lines, isShowReferLine } = view;

  useEffect(() => {
    setView({
      rulerWidth: width ? width - THICK : 0,
      rulerHeight: height,
      scale: scaleSize
    });

    return () => {
      setView({
        isShowReferLine: false,
        lines: {
          h: [],
          v: []
        }
      });
    };
  }, [width, height]);

  useLayoutEffect(() => {
    setView({
      width: DIMENSION[pageSize].width,
      height: DIMENSION[pageSize].height
    });
  }, [pageSize]);

  // 计算设计器画布缩放比例
  const scaleSize = useMemo(() => {
    return width ? Math.floor(((width - THICK) / view.width) * 100) / 100 : 1;
  }, [width, view.width]);

  const handleLine = (lines) => {
    setView({ lines });
  };
  // 显示/隐藏 参考线
  const handleShowReferLine = () => {
    setView({ isShowReferLine: !isShowReferLine });
  };

  const containerStyle = {
    position: "relative",
    width: view.width * scale + "px",
    height: view.height * scale + "px",
    display: "unset"
  };

  const canvasStyle = {
    width: view.width,
    height: view.height,
    transform: `scale(${scale})`
  };

  const handleSetting = () => {
    setView({
      isShowReferLine: false,
      lines: {
        h: [],
        v: []
      }
    });
  };

  return (
    <div className="gc-design__wrapper">
      {/* 刻度尺 */}
      <SketchRuler
        THICK={THICK}
        scale={scale}
        width={rulerWidth}
        height={rulerHeight}
        startX={startX}
        startY={startY}
        horLineArr={lines.h}
        verLineArr={lines.v}
        isOpenMenuFeature={true}
        isShowReferLine={isShowReferLine}
        handleLine={handleLine}
        handleShowReferLine={handleShowReferLine}
      />
      <div className="ruler-wrapper" ref={domRef}>
        <Scrollbar>
          <div className="design-body">
            <div className="canvas-container" style={containerStyle}>
              <div className="design-container" style={canvasStyle}>
                <div
                  className="bg-container"
                  style={{
                    background: backgroundImage
                      ? `url(${backgroundImage}) 0% 0% / 100% 100%`
                      : backgroundColor
                      ? backgroundColor
                      : null,
                    filter: `blur(${backgroundBlur}px)`,
                    opacity: parseFloat(backgroundOpacity / 10)
                  }}
                />
                {props.children}
              </div>
            </div>
          </div>
        </Scrollbar>
      </div>
      <div className="ruler-tool">
        <Tooltip title="清空所有参考线">
          <Button
            shape="circle"
            size="small"
            icon={<IconFont antd={true} type="SettingOutlined" />}
            onClick={handleSetting}
          />
        </Tooltip>
        <Space>
          <Tooltip title="缩小">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ZoomOutOutlined" />}
              onClick={() => {
                setView({ scale: parseFloat(Math.max(0.2, scale - 0.1).toFixed(2)) });
              }}
            />
          </Tooltip>
          <Tooltip title="放大">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ZoomInOutlined" />}
              onClick={() => {
                setView({ scale: parseFloat(Math.min(2, scale + 0.1).toFixed(2)) });
              }}
            />
          </Tooltip>
          <Tooltip title="自适应">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ExpandOutlined" />}
              onClick={() => {
                setView({ scale: scaleSize });
              }}
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
});

export default Wrapper;
