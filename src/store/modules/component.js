const initState = {
  mode: "development",
  conditions: [],
  dependences: {},
  dirlldownQuery: [],
  datavApiEnum: [],
  datavSqlEnum: []
};

/**
 * 用户信息、路由信息
 * @param {*} state
 * @param {*} action
 */
function components(state = initState, action) {
  switch (action.type) {
    case "SET_MODE": {
      return {
        ...state,
        mode: ["development", "preview"].includes(action.data) ? action.data : "preview"
      };
    }
    case "SET_DEPENDENCE": {
      return {
        ...state,
        dependences: action.data
      };
    }
    case "SET_DIRLLDOWN_QUERY": {
      return {
        ...state,
        dirlldownQuery: action.data
      };
    }
    case "DATAV_API_ENUM": {
      return {
        ...state,
        datavApiEnum: action.data
      };
    }
    case "DATAV_SQL_ENUM": {
      return {
        ...state,
        datavSqlEnum: action.data
      };
    }
    default:
      return state;
  }
}

export default components;
