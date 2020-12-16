import React from "react";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import { getFormat } from "~renderer/utils";

const rangeHoc = (p, onChange, RangeComponent) => {
  const { format = "dateTime" } = p.schema;
  const dateFormat = getFormat(format);
  let defaultObj = {};
  if (p.value && Array.isArray(p.value) && p.value[0] && p.value[1]) {
    defaultObj = {
      defaultValue: [moment(p.value[0], dateFormat), moment(p.value[1], dateFormat)]
    };
  }
  const datePrams = {
    ...p.options,
    ...defaultObj,
    style: { width: "100%" },
    showTime: format === "dateTime",
    disabled: p.disabled || p.readonly,
    onChange
  };
  return <RangeComponent {...datePrams} locale={locale} />;
};

const { RangePicker } = DatePicker;

const VdateRange = (p) => {
  const onChange = (value, string) => p.onChange(p.name, string);
  return rangeHoc(p, onChange, RangePicker);
};

export default VdateRange;
