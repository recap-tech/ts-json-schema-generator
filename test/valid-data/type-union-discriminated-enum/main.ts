enum ShapeType {
    Square = "square",
    Rectangle = "rectangle",
    Circle = "circle",
}

export interface Square {
    kind: ShapeType.Square;
    size: number;
}

export interface Rectangle {
    kind: ShapeType.Rectangle;
    width: number;
    height: number;
}

export interface Circle {
    kind: ShapeType.Circle;
    radius: number;
}

/**
 * @discriminator kind
 */
export type Shape = Square | Rectangle | Circle;
