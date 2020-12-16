import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Factory from "./factory";
import { mapping, widgets } from "~packages";
import "./atom.less";

export default class Factorys extends PureComponent {
  static propTypes = {
    mapping: PropTypes.object,
    widgets: PropTypes.object
  };

  static defaultProps = {
    mapping: {},
    widgets: {}
  };

  render() {
    const { mapping: customizedMapping, widgets: customizedWidgets, ...props } = this.props;
    return (
      <Factory
        {...props}
        mapping={{
          ...mapping,
          ...customizedMapping
        }}
        widgets={{
          ...widgets,
          ...customizedWidgets
        }}
      />
    );
  }
}
