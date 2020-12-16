import BAR_SCHEMA from "./bar";
import LINE_SCHEMA from "./line";
import DATAV_SCHEMA from "./datav";

// if you should all configs.
export const gridToSchema = [BAR_SCHEMA, LINE_SCHEMA, DATAV_SCHEMA].flat(1);

export { default as pageSchema } from "./page";
