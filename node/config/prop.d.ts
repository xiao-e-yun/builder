import { Prop } from "./prop_type";
declare type map_list = {
    [key: string]: string;
};
export default function (general: {
    supportsaudioprocessing: boolean;
    properties: {
        [key: string]: any;
    };
    localization: {
        [lang: string]: {
            [ui_key: string]: string;
        };
    };
}, props: Prop[]): Promise<{
    ignore: map_list;
    mapping: map_list;
    directory: {
        demand: map_list;
        fetch: map_list;
    };
}>;
export {};
