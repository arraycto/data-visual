import React from "react";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";

import { getFormat } from "~renderer/utils";

const dateHoc = (p, onChange, DateComponent) => {
  const style = p.invalid ? { borderColor: "#f5222d" } : {};
  const { format = "dateTime" } = p.schema;
  const dateFormat = getFormat(format);
  let defaultObj = {};
  if (p.value) {
    defaultObj.value = moment(p.value, dateFormat);
  } else {
    defaultObj.value = "";
  }

  const dateParams = {
    ...p.options,
    ...defaultObj,
    style: { width: "100%", ...style },
    disabled: p.disabled || p.readonly,
    onChange
  };

  if (format === "dateTime") {
    dateParams.showTime = true;
  }

  return <DateComponent {...dateParams} locale={locale} />;
};

const VDatePicker = (p) => {
  const { format = "dateTime" } = p.schema;
  const onChange = (value, string) => p.onChange(p.name, string);
  const DateComponent = format === "time" ? TimePicker : DatePicker;
  return dateHoc(p, onChange, DateComponent);
};

export default VDatePicker;
