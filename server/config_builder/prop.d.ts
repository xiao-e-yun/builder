import { prop } from "./prop_type";
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
}, props: prop[]): Promise<{
    [key: string]: string;
}>;
