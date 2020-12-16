import BAR_CONF from "./bar";
import LINE_CONF from "./line";
import MAP_CONF from "./map";
import DATAV_CONF from "./datav";

// if you should all configs.
const condition = [BAR_CONF, BAR_CONF, LINE_CONF, DATAV_CONF].flat(1);

export default {
  vbar: BAR_CONF,
  vline: LINE_CONF,
  vmap: MAP_CONF,
  vdatav: DATAV_CONF,
  collection: condition
};
