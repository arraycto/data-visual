import React, { forwardRef } from "react";
import { Scrollbar } from "~components";
import { useAutoResize } from "~renderer/common/hooks";

/**
 * 设计器容器大小
 */
const Wrapper = forwardRef((props, ref) => {
  const { backgroundColor, backgroundImage, backgroundBlur, backgroundOpacity } = props;
  const { domRef } = useAutoResize(ref);

  return (
    <div className="gc-design__wrapper" ref={domRef}>
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
      <Scrollbar>{props.children}</Scrollbar>
    </div>
  );
});

export default Wrapper;
