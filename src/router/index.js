import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import history from "./history";
import AccountIn from "@/pages/account";
import BaseLayout from "@/layouts";
import AxureScreen from "@/pages/design-screen";
import AxureGrid from "@/pages/design-report";
import AxureScreenPanel from "@/pages/design-screen/preview";
import AxureGridPanel from "@/pages/design-report/preview";

class CreateRouter extends Component {
  render() {
    const { accessToken } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/account" component={AccountIn} />
          <Route path="/screen/preview/:id" component={AxureScreenPanel} />
          <Route path="/grid/preview/:id" component={AxureGridPanel} />
          <Route path="/workspace/screen" component={AxureScreen} />
          <Route path="/workspace/grid" component={AxureGrid} />
          <Route
            path="/"
            render={() => {
              return !accessToken ? <Redirect to="/account" /> : <BaseLayout />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect((state) => ({ accessToken: state.app.accessToken }))(CreateRouter);
