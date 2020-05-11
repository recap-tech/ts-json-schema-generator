export interface Config {
    path?: string;
    type?: string;
    tsconfig?: string;
    expose?: "all" | "none" | "export";
    topRef?: boolean;
    jsDoc?: "none" | "extended" | "basic";
    sortProps?: boolean;
    strictTuples?: boolean;
    skipTypeCheck?: boolean;
    encodeRefs?: boolean;
    extraTags?: string[];
}
export declare const DEFAULT_CONFIG: Omit<Required<Config>, "path" | "type" | "tsconfig">;
