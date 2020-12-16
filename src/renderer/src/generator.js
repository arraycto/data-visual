import React from "react";
import { Empty } from "antd";

import "./renderer.less";
import "./datav.less";

const subFieldGenerator = ({ fieldCanRedefine: can, Field: SourceField = null, props = {} }) => (args) => {
  const { Field: RedefineField = null, ...rest } = args;
  const Field = (can && RedefineField) || SourceField;
  if (Field) {
    return <Field {...props} {...rest} />;
  }
  return (
    <div className="gc-design__empty">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="组件未配置" />
    </div>
  );
};

export default subFieldGenerator;
