import React, { useState, useEffect, forwardRef } from "react";
import { Spin } from "antd";
import { converLayout } from "~renderer/utils";
import { onEvent, offEvent } from "@/utils";

import "./style.less";

const VIframe = forwardRef((props, ref) => {
  let {
    className = "",
    style = {
      width: "100%",
      height: "100%"
    },
    frameBorder = 0,
    src = "",
    data,
    events,
    onAction = () => {}
  } = props;
  const [loading, setLoading] = useState(true);
  const [tempStyle, setTempStyle] = useState({});

  useEffect(() => {
    onEvent(window, "message", onMessage);

    postMessage("update", data);
    return () => {
      setLoading(false);
      offEvent(window, "message", onMessage);
    };
  }, []);

  const onMessage = (e) => {
    if (!e.data || e.data === "" || !events) {
      return;
    }

    const [prefix, type] = e.data.type.split(":");

    if (prefix !== "iframe" || !type) {
      return;
    }

    if (type === "resize" && e.data.data) {
      setTempStyle({
        width: converLayout(e.data.data.width),
        height: converLayout(e.data.data.height)
      });
    } else {
      const action = events[type];
      action && onAction(e, action, Object.assign(data, e.data.data));
    }
  };

  const postMessage = (type, data) => {
    ref.current.contentWindow?.postMessage(
      {
        type: `iframe:${type}`,
        data
      },
      "*"
    );
  };

  const onLoad = () => {
    setLoading(false);
    src && postMessage("init", data);
  };

  // TODO：组件通知iframe reload
  const reload = (query) => {
    if (query) {
      return receive(query);
    }

    if (src) {
      // const enCodeUrl = decodeURIComponent(src); enCodeUrl.startsWith("http") ? enCodeUrl : `http://${enCodeUrl}`;
      ref.current.src = src;
    }
  };

  // 当别的组件把数据发给 iframe 里面的时候执行。
  const receive = (values) => {
    if (src) {
      ref.current.src = src;
      postMessage("receive", Object.assign(data, values));
    }
  };

  return (
    <Spin spinning={loading} wrapperClassName="gc-iframe" size="large">
      <iframe
        className={className}
        ref={ref}
        style={{ ...style, ...tempStyle, verticalAlign: "top" }}
        onLoad={onLoad}
        src={src}
        frameBorder={frameBorder}
      />
    </Spin>
  );
});

export default VIframe;
