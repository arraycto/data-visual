import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Vcharts } from "~components";
import SubDialog from "../../dialog";
import { getOption } from "../options/scatter";

const GeneratorScatter = ({ value, options, onChange, mode, dirlldownQuery, dispatch }) => {
  const [dataSource, setDataSource] = useState({});
  const [stauts, setStauts] = useState(false);
  const [visible, setVisible] = useState(false);
  const { dataConfig, isRefresh, drillDownOpen } = value;

  useEffect(() => {
    setDataSource(dataConfig.data);
  }, [dataConfig.data]);

  useEffect(() => {
    setStauts(drillDownOpen);
  }, [drillDownOpen]);

  const subDialogTpl = useMemo(() => {
    return visible && value.drillDown && value.drillDown.length > 0 ? (
      <SubDialog
        visible={visible}
        value={value.drillDown[0]}
        onRowValueChange={onChange}
        onCancel={(e) => {
          e.stopPropagation();
          // TODO: 解锁图层
          mode === "development" && value.drillDown[0].drillDownLevel === 0 && onChange({ isLock: false }, 0);
          // TODO: 下钻过滤参数条件
          dirlldownQuery.pop();
          dispatch({
            type: "SET_DIRLLDOWN_QUERY",
            data: dirlldownQuery
          });

          setVisible((o) => !o);
        }}
      />
    ) : null;
  }, [visible, onChange]);

  if (drillDownOpen) {
    return (
      <>
        {subDialogTpl}
        <Vcharts
          refresh={stauts}
          options={getOption(options, dataSource)}
          theme="dark"
          style={{ width: "100%", height: "100%" }}
          onEvents={{
            click: (param) => {
              if (value.drillDown.length === 0) return;
              // TODO: 锁住图层
              mode === "development" && value.drillDown[0].drillDownLevel === 0 && onChange({ isLock: true }, 0);
              let dirlldowns = dirlldownQuery.concat([
                {
                  fireKey: "",
                  item: {
                    name: param.name,
                    value: param.value,
                    category: param.seriesName,
                    _default: param.name
                  }
                }
              ]);
              dispatch({
                type: "SET_DIRLLDOWN_QUERY",
                data: dirlldowns
              });

              setVisible(true);
            }
          }}
        />
      </>
    );
  }

  return (
    <Vcharts
      refresh={isRefresh}
      options={getOption(options, dataSource)}
      theme="dark"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default connect((state) => ({
  mode: state.component.mode,
  dirlldownQuery: state.component.dirlldownQuery
}))(GeneratorScatter);
