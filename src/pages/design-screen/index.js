/**
 * core 编辑器渲染核心代码
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AxureScreen } from "~renderer";
import { useStore, useDocumentTitle } from "~renderer/common/hooks";
import { Ctx, Compose } from "~renderer/common/context";
import { mergeField, setLevelPath } from "~renderer/utils";

import AxureLayoutAside from "./src/aside";
import AxureLayoutHeader from "./src/header";
import AxureLayoutContent from "./src/wrapper";
import AxureLayoutField from "./src/setting";

import { dataVScreen, dataVApiList, dataVSqlList } from "@/api";
import { loadScript } from "@/utils/helper";

loadScript("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "css");

const AxureEditor = (props) => {
  useDocumentTitle("DataV Pro - 数据大屏");
  // 设计器相关状态
  const [state, setState] = useStore({
    tabsKey: "base",
    selected: "-",
    components: [],
    page: {
      name: "",
      remark: "",
      pageSize: "large",
      zoom: "cover",
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
    visible: false,
    rulerWidth: 0,
    rulerHeight: 0,
    width: 1366,
    height: 768,
    scale: 1,
    startX: 0,
    startY: 0,
    lines: {
      h: [],
      v: []
    },
    isShowReferLine: true
  });
  // 异步多接口请求
  const storageData = async () => {
    try {
      const results = await Promise.all([dataVApiList(), dataVSqlList()]).then((res) => {
        return res;
      });
      props.dispatch({ type: "DATAV_API_ENUM", data: results[0].data });
      props.dispatch({ type: "DATAV_SQL_ENUM", data: results[1].data });
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await dataVScreen();
      setState({
        page: data.page,
        components: data.components
      });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    props.dispatch({ type: "SET_MODE", data: "development" });
    props.dispatch({ type: "SET_DIRLLDOWN_QUERY", data: [] });
    // fetchData();
    storageData();
  }, []);

  const onValueChange = (uniqueId, value, level = 0) => {
    let results = mergeField(state.components, uniqueId, value, level);
    setLevelPath(results, null);

    setState({
      components: results
    });
  };

  return (
    <Ctx.Provider value={{ state, setState }}>
      <Compose.Provider value={{ view, setView }}>
        <div className="gc-design">
          <AxureLayoutHeader />
          <section className="gc-design__bd">
            <AxureLayoutAside />
            <AxureLayoutContent {...state.page}>
              {state.components.length > 0
                ? state.components.map((prop) => (
                    <AxureScreen value={prop} key={prop.uniqueId} onValueChange={onValueChange} />
                  ))
                : null}
            </AxureLayoutContent>
            <AxureLayoutField />
          </section>
        </div>
      </Compose.Provider>
    </Ctx.Provider>
  );
};

export default connect((state) => state.component)(AxureEditor);
