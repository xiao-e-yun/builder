import OutputConfig, { Config } from "./config";
import { Prop } from "./prop_type";
declare const _default: {
    builder: typeof builder;
};
export default _default;
declare type Options = {
    custom?: OutputConfig;
    out_config?: string;
    out_types?: string;
};
/**
 * @name 建立配置文件
 * @param config 配置文件
 * @param path 保存位置
 * @returns 返回配置文件
 */
declare function builder(config: Config, property?: Prop[], options?: Options): Promise<{
    config: OutputConfig;
    types: {
        ignore: {
            [key: string]: string;
        };
        mapping: {
            [key: string]: string;
        };
        directory: {
            demand: {
                [key: string]: string;
            };
            fetch: {
                [key: string]: string;
            };
        };
    };
}>;
