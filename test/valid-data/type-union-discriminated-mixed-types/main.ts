enum ShapeType {
    Rectangle = "rectangle",
}

export type Square = {
    kind: 1;
    size: number;
};

export interface Rectangle {
    kind: ShapeType.Rectangle
    width: number;
    height: number;
}

export type Circle = {
    kind: "circle";
    radius: number;
};


/**
 * @discriminator kind
 */
export type Shape = Square | Rectangle | Circle;
