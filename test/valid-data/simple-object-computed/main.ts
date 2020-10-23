enum Enum {
    Optional = "optional",
}

export interface SimpleObject {
    ["required"]: string;
    [Enum.Optional]?: number;
}
