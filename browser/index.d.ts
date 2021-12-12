import General from './wallpaper';
import { NomalProp } from '../node/config/prop_type';
export declare type Types = {
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
export declare type Prop<TypesJson extends Types> = TypesJson["mapping"];
declare type List = {
    [key: string]: string;
};
interface Mapping<T extends List, U extends List> extends Types {
    mapping: T;
    directory: {
        demand: List;
        fetch: U;
    };
}
export default function <T extends List, U extends List>(win: Window, types_json: Mapping<T, U>, config: Config<T, U>): void;
interface Config<T, U> {
    paused?(): void;
    general?(name: General): void;
    props?(name: keyof T, value: boolean | string | number, prop: NomalProp): void;
    fetch?(name: keyof U, files: string[]): void;
    audio?(audio: number[]): void;
}
export {};
