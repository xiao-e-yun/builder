declare const _default: {
    config: {
        builder: (config: import("./config/config").Config, property?: import("./config/prop_type").Prop[], options?: {
            custom?: import("./config/config").default | undefined;
            out_config?: string | undefined;
            out_types?: string | undefined;
        } | undefined) => Promise<{
            config: import("./config/config").default;
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
    };
};
export default _default;
