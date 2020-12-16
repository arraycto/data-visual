import React, { useRef } from "react";
import { IFrame } from "~components";

const IFrameBus = () => {
  const refs = useRef(null);
  return (
    <div className="gc-page">
      <IFrame
        ref={refs}
        type="iframe:init"
        data={{ iframeId: "111" }}
        src="./iframe.html"
        events={{
          detail: {
            actionType: "reload",
            dialog: {
              title: "弹框",
              body: "iframe 传给 datav pro 的 id 是：${iframeId}"
            }
          }
        }}
        onAction={(event, action, data) => {
          console.log(" action", action, "data", data);
        }}
      />
    </div>
  );
};

export default IFrameBus;
