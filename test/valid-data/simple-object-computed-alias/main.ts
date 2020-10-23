enum Enum {
    Optional = "optional",
}

export type SimpleObject = {
    ["required"]: string;
    [Enum.Optional]?: number;
};
