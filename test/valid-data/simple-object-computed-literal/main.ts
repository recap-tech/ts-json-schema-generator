enum Enum {
    Optional = "optional",
}

export const Foo = {
    ["required"]: "hello",
    [Enum.Optional]: 123,
};

export type SimpleObject = typeof Foo;
