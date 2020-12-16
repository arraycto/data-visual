/* eslint-disable */
import React, { Suspense } from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import store from "@/store";
import { AutoLoading, Scrollbar } from "~components";
import routerList from "@/router/router-map";

import { useDocumentTitle } from "~renderer/common/hooks";
import { getPageTitle } from "@/utils/helper";
import menuList from "./config";

const LayoutContent = (props) => {
  const { location } = props;
  const { userInfo } = store.getState().app;
  const pageTiltle = getPageTitle(menuList, location.pathname);
  useDocumentTitle(pageTiltle);

  // Query whether you have permission to enter this page
  const hasPermission = (route) => {
    return userInfo.role === "admin" || !route.roles || route.roles.includes(userInfo.role);
  };

  return (
    <Layout.Content className="gc-layout__bd" id="gc-layout">
      <Suspense fallback={<AutoLoading />}>
        <Scrollbar hideHorizontal>
          <Switch location={location}>
            <Redirect exact from="/" to="/dashboard" />
            {routerList.map((route) => {
              return hasPermission(route) && <Route component={route.component} key={route.path} path={route.path} />;
            })}
            <Redirect to="/error/404" />
          </Switch>
        </Scrollbar>
      </Suspense>
    </Layout.Content>
  );
};

export default withRouter(LayoutContent);
