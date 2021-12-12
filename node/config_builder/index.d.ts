import { config } from "./config";
import { prop } from "./prop_type";
declare const _default: {
    builder: typeof builder;
};
export default _default;
declare function builder(config: config, property?: prop[], path?: string): Promise<string>;
