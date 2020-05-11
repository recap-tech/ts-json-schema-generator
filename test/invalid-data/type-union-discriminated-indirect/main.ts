export interface Square {
    kind: "square";
    size: number;
}

export interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

export type Quadrilateral = Square | Rectangle;

export interface Circle {
    kind: "circle";
    radius: number;
}

/**
 * @discriminator kind
 */
export type Shape = Quadrilateral | Circle;
