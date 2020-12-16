import React, { Fragment, useEffect, forwardRef, createContext, useContext, useMemo } from "react";
import { Space, Button, Tooltip } from "antd";

import { useStore, useAutoResize } from "~renderer/common/hooks";

import { IconFont, Scrollbar, SketchRuler } from "~components";

const Compose = createContext();
const thick = 20;

const initState = {
  rulerWidth: 0,
  rulerHeight: 0,
  width: 1366,
  height: 768,
  background: "#191c21",
  // 缩放大小
  scale: 1,
  // 坐标X
  startX: 0,
  // 坐标Y
  startY: 0,
  // 参考线数据
  lines: {
    h: [],
    v: []
  },
  // 显示参考线
  isShowReferLine: true
};

// 设计器容器大小
const Wrapper = forwardRef((props, ref) => {
  const { width, height, domRef } = useAutoResize(ref);
  const { state, setState } = useContext(Compose);
  const { rulerWidth, rulerHeight, scale, startX, startY, lines, isShowReferLine } = state;

  useEffect(() => {
    setState({
      rulerWidth: width - 20,
      rulerHeight: height,
      scale: handleSize
    });
    return () => {
      setState({
        isShowReferLine: false,
        lines: {
          h: [],
          v: []
        }
      });
    };
  }, [width, height]);

  // 计算设计器画布缩放比例
  const handleSize = useMemo(() => {
    return width / state.width;
  }, [width]);

  const handleLine = (lines) => {
    setState({ lines });
  };
  // 显示/隐藏 参考线
  const handleShowReferLine = () => {
    setState({ isShowReferLine: !isShowReferLine });
  };

  const containerStyle = {
    position: "relative",
    width: state.width * scale + "px",
    height: state.height * scale + "px"
  };

  const canvasStyle = {
    width: state.width,
    height: state.height,
    transform: `scale(${scale})`
  };

  const handleSetting = () => {
    setState({
      isShowReferLine: false,
      lines: {
        h: [],
        v: []
      }
    });
  };

  return (
    <Fragment>
      {/* 刻度尺 */}
      <SketchRuler
        thick={thick}
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
              <div className="canvas-body" style={canvasStyle}>
                {props.children}
              </div>
              <div className="canvas-size">1366 X 768</div>
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
                setState({ scale: parseFloat(Math.max(0.2, scale - 0.1).toFixed(2)) });
              }}
            />
          </Tooltip>
          <Tooltip title="放大">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ZoomInOutlined" />}
              onClick={() => {
                setState({ scale: parseFloat(Math.min(2, scale + 0.1).toFixed(2)) });
              }}
            />
          </Tooltip>
          <Tooltip title="自适应">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ExpandOutlined" />}
              onClick={() => {
                setState({ scale: handleSize });
              }}
            />
          </Tooltip>
        </Space>
      </div>
    </Fragment>
  );
});

// 刻度尺 用法core
const ReactRulers = () => {
  const [state, setState] = useStore(initState);

  return (
    <Compose.Provider value={{ state, setState }}>
      <Wrapper />
    </Compose.Provider>
  );
};

export default ReactRulers;
