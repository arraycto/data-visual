/**
 * core 编辑器渲染核心代码
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useStore, useDocumentTitle } from "~renderer/common/hooks";
import { Ctx, Compose } from "~renderer/common/context";
import { loadScript } from "@/utils/helper";

import AxureLayoutAside from "./src/aside";
import AxureLayoutHeader from "./src/header";
import AxureLayoutContent from "./src/wrapper";
import AxureLayoutField from "./src/setting";

import { dataVGrid, dataVApiList, dataVSqlList } from "@/api";
import { AxureGrid } from "~renderer";

loadScript("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "css");

const AxureGridEditor = (props) => {
  useDocumentTitle("DataV Pro - 数据报表");
  const [state, setState] = useStore({
    tabsKey: "base",
    selected: "-",
    components: [],
    page: {
      name: "",
      remark: "",
      backgroundColor: "rgba(29, 33, 39, 1)",
      backgroundImage: "",
      backgroundBlur: 0,
      backgroundOpacity: 10
    },
    undo: [],
    redo: []
  });

  // 其他无关状态
  const [view, setView] = useStore({
    version: "2.0.0",
    layerCollapsed: false,
    settingCollapsed: false,
    visible: false
  });

  // 异步多接口请求
  const storageData = async () => {
    try {
      const results = await Promise.all([dataVApiList(), dataVSqlList()]).then((ret) => {
        return ret;
      });
      props.dispatch({ type: "DATAV_API_ENUM", data: results[0].data });
      props.dispatch({ type: "DATAV_SQL_ENUM", data: results[1].data });
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchData = async () => {
    const { data } = await dataVGrid();
    setState({
      page: data.page,
      components: data.components
    });
  };

  useEffect(() => {
    fetchData();
    storageData();
  }, []);

  return (
    <Ctx.Provider value={{ state, setState }}>
      <Compose.Provider value={{ view, setView }}>
        <div className="gc-design">
          <AxureLayoutHeader />
          <section className="gc-design__bd">
            <AxureLayoutAside title="Axure v2" />
            <AxureLayoutContent {...state.page}>
              <AxureGrid widgets={state.components} />
            </AxureLayoutContent>
            <AxureLayoutField />
          </section>
        </div>
      </Compose.Provider>
    </Ctx.Provider>
  );
};

export default connect((state) => state.component)(AxureGridEditor);
