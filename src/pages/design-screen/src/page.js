import React from "react";
import Renderers from "~renderer/factory";
import { useEditorStore } from "~renderer/common/hooks";

import { pageSchema } from "../schema";

const PageSetting = () => {
  const { state, setState } = useEditorStore();

  const onValueChange = (value) => {
    setState({
      page: value.page
    });
  };

  return (
    <Renderers
      schema={pageSchema}
      formData={{
        page: state.page
      }}
      onChange={onValueChange}
    />
  );
};

export default PageSetting;
