enum ShapeType {
    Rectangle = "rectangle",
}

export interface Square {
    kind: "square";
    size: number;
}

export interface Rectangle {
    kind: ShapeType.Rectangle;
    width: number;
    height: number;
}

export interface Circle {
    kind: "circle";
    radius: number;
}

/**
 * @discriminator kind
 */
export type Shape = Square | Rectangle | Circle;
