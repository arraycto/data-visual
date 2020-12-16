const initState = {
  accessToken: "",
  userInfo: {},
  routerPath: "",
  layouts: {},
  sidebarOpened: false
};

/**
 * 用户信息、路由信息
 * @param {*} state
 * @param {*} action
 */
function app(state = initState, action) {
  switch (action.type) {
    case "ACCESS_TOKEN": {
      return {
        ...state,
        accessToken: action.data
      };
    }
    case "USER_INFO": {
      return {
        ...state,
        userInfo: action.data
      };
    }
    case "ROUTER_PATH": {
      return {
        ...state,
        routerPath: action.data
      };
    }
    case "PAGE_LAYOUTS": {
      return {
        ...state,
        layouts: action.data
      };
    }
    case "MENU_SIDEBAR": {
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened
      };
    }
    default:
      return state;
  }
}

export default app;
