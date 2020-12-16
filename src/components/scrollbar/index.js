import React, { forwardRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import { useAutoResize } from "~renderer/common/hooks";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.14)"
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const VScrollbar = forwardRef((props, ref) => {
  const { h, hideHorizontal = false } = props;
  const { height, domRef } = useAutoResize(ref);

  if (hideHorizontal) {
    return (
      <div style={{ width: "100%", height: "100%" }} ref={domRef}>
        <Scrollbars
          style={{
            height: h ? h : height,
            color: "#0a73ff"
          }}
          renderThumbVertical={renderThumb}
          autoHide
        >
          {props.children}
        </Scrollbars>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }} ref={domRef}>
      <Scrollbars
        style={{
          height: h ? h : height,
          color: "#0a73ff"
        }}
        renderThumbVertical={renderThumb}
        renderThumbHorizontal={renderThumb}
        autoHide
      >
        {props.children}
      </Scrollbars>
    </div>
  );
});

export default VScrollbar;
