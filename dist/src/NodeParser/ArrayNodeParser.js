"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ArrayType_1 = require("../Type/ArrayType");
class ArrayNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === ts.SyntaxKind.ArrayType;
    }
    createType(node, context) {
        const type = this.childNodeParser.createType(node.elementType, context);
        if (type === undefined) {
            return undefined;
        }
        return new ArrayType_1.ArrayType(type);
    }
}
exports.ArrayNodeParser = ArrayNodeParser;
//# sourceMappingURL=ArrayNodeParser.js.map